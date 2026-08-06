import type { ApprovedPillar, CuratorState } from './contracts.js'

export interface PublicCatalogArticle {
  sourceId: string
  title: string
  url: string
  author: string
  publishedAt: string
  tags: string[]
  excerpt?: string
  pillars: ApprovedPillar[]
  subjects: string[]
  classificationState: 'CLASSIFIED' | 'UNCLASSIFIED'
}

export interface PublicCatalog {
  version: 1
  refreshedAt: string
  articles: PublicCatalogArticle[]
}

export function toPublicCatalog(state: CuratorState): PublicCatalog {
  const articles = state.articles
    .map((article): PublicCatalogArticle => ({
      sourceId: article.sourceId,
      title: article.canonicalTitle,
      url: article.canonicalUrl,
      author: article.author,
      publishedAt: article.publishedAt,
      tags: [...article.tags],
      ...(article.excerpt ? { excerpt: article.excerpt } : {}),
      pillars: [...article.classification.pillars],
      subjects: [...article.classification.subjects],
      classificationState: article.classification.pillars.length > 0 ? 'CLASSIFIED' : 'UNCLASSIFIED',
    }))
    .sort((left, right) => Date.parse(right.publishedAt) - Date.parse(left.publishedAt))

  return {
    version: 1,
    refreshedAt: state.refreshedAt,
    articles,
  }
}
