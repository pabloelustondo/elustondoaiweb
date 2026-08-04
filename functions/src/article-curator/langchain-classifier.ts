import { ChatPromptTemplate } from '@langchain/core/prompts'
import { ChatGoogle } from '@langchain/google/node'
import { z } from 'zod'
import {
  APPROVED_PILLARS,
  type ArticleClassifier,
  type ClassificationInput,
  type ClassificationResult,
} from './contracts.js'

const classificationBatchSchema = z.object({
  classifications: z.array(z.object({
    sourceId: z.string().min(1),
    pillars: z.array(z.enum(APPROVED_PILLARS)).max(APPROVED_PILLARS.length),
    subjects: z.array(z.string().min(1).max(80)).max(6),
    rationale: z.string().min(1).max(500),
    confidence: z.number().min(0).max(1),
  })),
})

export function validateClassificationResults(
  inputs: readonly ClassificationInput[],
  candidate: unknown,
): ClassificationResult[] {
  const parsed = classificationBatchSchema.parse(candidate)
  const requestedIds = new Set(inputs.map((article) => article.sourceId))
  const returnedIds = new Set<string>()

  for (const result of parsed.classifications) {
    if (!requestedIds.has(result.sourceId)) {
      throw new Error(`The classifier returned an unknown article: ${result.sourceId}`)
    }
    if (returnedIds.has(result.sourceId)) {
      throw new Error(`The classifier returned article ${result.sourceId} more than once.`)
    }
    returnedIds.add(result.sourceId)
  }

  const missing = [...requestedIds].filter((sourceId) => !returnedIds.has(sourceId))
  if (missing.length > 0) {
    throw new Error(`The classifier omitted required articles: ${missing.join(', ')}`)
  }

  return parsed.classifications.map((result) => ({
    ...result,
    subjects: [...new Set(result.subjects.map((subject) => subject.trim()).filter(Boolean))],
    origin: 'LANGCHAIN_GEMINI' as const,
    humanReviewState: 'AI_CURATED' as const,
  }))
}

export class LangChainArticleClassifier implements ArticleClassifier {
  constructor(private readonly model: ChatGoogle) {}

  async classify(articles: readonly ClassificationInput[]): Promise<ClassificationResult[]> {
    if (articles.length === 0) return []

    const prompt = ChatPromptTemplate.fromMessages([
      [
        'system',
        [
          'Classify Elustondo.ai Medium articles using only these approved editorial pillars: SDLC², Architecture, Modernization.',
          'An article may have multiple pillars or no pillar. Never invent another pillar.',
          'Use no more than six concise technical subjects.',
          'The rationale must identify the title or excerpt evidence used and must not add claims about the author, clients, projects, or results.',
          'When evidence is insufficient, return an empty pillars array and explain that the article remains unclassified.',
          'Return exactly one classification for every supplied sourceId.',
        ].join(' '),
      ],
      ['human', 'Articles to classify:\n{articlesJson}'],
    ])

    const structuredModel = this.model.withStructuredOutput(classificationBatchSchema, {
      name: 'classify_elustondo_articles',
    })
    const chain = prompt.pipe(structuredModel)
    const candidate = await chain.invoke({ articlesJson: JSON.stringify(articles) })
    return validateClassificationResults(articles, candidate)
  }
}

export class DeterministicFixtureClassifier implements ArticleClassifier {
  async classify(articles: readonly ClassificationInput[]): Promise<ClassificationResult[]> {
    return articles.map((article) => {
      const text = `${article.canonicalTitle} ${article.excerpt ?? ''}`.toLowerCase()
      const pillars: ClassificationResult['pillars'] = []
      if (/sdlc|specification|solid|responsibility-driven/.test(text)) pillars.push('SDLC²')
      if (/architecture|local llm|runtime|agentic system/.test(text)) pillars.push('Architecture')
      if (/modernization|legacy|payment system/.test(text)) pillars.push('Modernization')

      return {
        sourceId: article.sourceId,
        pillars,
        subjects: pillars.length > 0 ? ['deterministic local fixture'] : [],
        rationale: pillars.length > 0
          ? `Local fixture keywords matched: ${pillars.join(', ')}.`
          : 'No approved-pillar keyword matched in the deterministic local fixture.',
        confidence: pillars.length > 0 ? 0.75 : 0.25,
        origin: 'LANGCHAIN_GEMINI',
        humanReviewState: 'AI_CURATED',
      }
    })
  }
}
