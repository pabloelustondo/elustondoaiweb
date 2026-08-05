import type { ClassifiedArticle } from './articleTaxonomy'
import type { ArticlePillar } from './articleTaxonomy'

export type { ClassifiedArticle } from './articleTaxonomy'

export interface RankedArticle {
  article: ClassifiedArticle
  reasons: string[]
}

function newestFirst(left: ClassifiedArticle, right: ClassifiedArticle) {
  const dateOrder = Date.parse(right.publishedAt) - Date.parse(left.publishedAt)
  return dateOrder || left.sourceId.localeCompare(right.sourceId)
}

export function rankLatest(articles: readonly ClassifiedArticle[]) {
  return [...articles].sort(newestFirst)
}

export function rankPillarArticles(articles: readonly ClassifiedArticle[], pillar: ArticlePillar): RankedArticle[] {
  return articles
    .filter((article) => article.pillars.includes(pillar))
    .map((article) => {
      const reasons: string[] = []
      if (article.canonicalFor.includes(pillar)) reasons.push(`Canonical article for ${pillar}.`)
      if (article.featuredFor.includes(pillar)) reasons.push(`Featured by editorial decision for ${pillar}.`)
      if (article.editorialPriority > 0) reasons.push(`Editorial priority ${article.editorialPriority}.`)
      if (reasons.length === 0) reasons.push(`Approved supporting article for ${pillar}; newest publication first when editorial signals are equal.`)
      return { article, reasons }
    })
    .sort((left, right) => {
      const canonical = Number(right.article.canonicalFor.includes(pillar)) - Number(left.article.canonicalFor.includes(pillar))
      if (canonical) return canonical
      const featured = Number(right.article.featuredFor.includes(pillar)) - Number(left.article.featuredFor.includes(pillar))
      if (featured) return featured
      const priority = right.article.editorialPriority - left.article.editorialPriority
      return priority || newestFirst(left.article, right.article)
    })
}

export function relatedArticles(origin: ClassifiedArticle, articles: readonly ClassifiedArticle[]): RankedArticle[] {
  return articles
    .filter((article) => article.sourceId !== origin.sourceId)
    .map((article) => {
      const sharedPillars = article.pillars.filter((pillar) => origin.pillars.includes(pillar))
      const sharedSubjects = article.subjects.filter((subject) => origin.subjects.includes(subject))
      const reasons = [
        ...(sharedPillars.length ? [`Shared pillar: ${sharedPillars.join(', ')}.`] : []),
        ...(sharedSubjects.length ? [`Shared subject: ${sharedSubjects.join(', ')}.`] : []),
      ]
      return { article, reasons, sharedPillars: sharedPillars.length, sharedSubjects: sharedSubjects.length }
    })
    .filter((item) => item.reasons.length > 0)
    .sort((left, right) => right.sharedPillars - left.sharedPillars || right.sharedSubjects - left.sharedSubjects || newestFirst(left.article, right.article))
    .map(({ article, reasons }) => ({ article, reasons }))
}
