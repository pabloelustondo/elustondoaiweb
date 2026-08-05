import { describe, expect, it } from 'vitest'
import { validateClassificationResults } from './langchain-classifier.js'

const inputs = [{ sourceId: 'new-article', canonicalTitle: 'A new article' }]

describe('validateClassificationResults', () => {
  it('accepts only the approved structured classification shape', () => {
    const result = validateClassificationResults(inputs, {
      classifications: [{
        sourceId: 'new-article',
        pillars: ['Architecture'],
        subjects: ['agents', 'agents'],
        rationale: 'The title and excerpt discuss software architecture.',
        confidence: 0.8,
      }],
    })

    expect(result[0]).toMatchObject({
      pillars: ['Architecture'],
      subjects: ['agents'],
      origin: 'LANGCHAIN_GEMINI',
      humanReviewState: 'AI_CURATED',
    })
  })

  it('rejects invented pillars', () => {
    expect(() => validateClassificationResults(inputs, {
      classifications: [{
        sourceId: 'new-article',
        pillars: ['Marketing'],
        subjects: [],
        rationale: 'Unsupported category.',
        confidence: 0.5,
      }],
    })).toThrow()
  })

  it('rejects missing and unexpected article identities', () => {
    expect(() => validateClassificationResults(inputs, { classifications: [] })).toThrow('omitted')
    expect(() => validateClassificationResults(inputs, {
      classifications: [{
        sourceId: 'different-article',
        pillars: [],
        subjects: [],
        rationale: 'No classification.',
        confidence: 0.2,
      }],
    })).toThrow('unknown article')
  })
})
