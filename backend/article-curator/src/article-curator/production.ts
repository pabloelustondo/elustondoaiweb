import { ChatGoogle } from '@langchain/google/node'
import { ArticleCurator } from './curator.js'
import { LangChainArticleClassifier } from './langchain-classifier.js'
import {
  LangChainMediumListMembershipSource,
  MediumProfileRssReader,
  RssValidatedMediumCatalogSource,
} from './medium-source.js'
import {
  ConsoleCuratorLogger,
  FirebaseStorageCuratorStore,
} from './store.js'
import type { CuratorLogger } from './contracts.js'

export function createProductionArticleCurator(logger: CuratorLogger = new ConsoleCuratorLogger()): ArticleCurator {
  const model = new ChatGoogle({
    model: process.env.CURATOR_GEMINI_MODEL || 'gemini-2.5-flash-lite',
    platformType: 'gcp',
    maxRetries: 2,
  })
  const membershipSource = new LangChainMediumListMembershipSource(model)
  const source = new RssValidatedMediumCatalogSource(
    membershipSource,
    new MediumProfileRssReader(),
  )

  return new ArticleCurator(
    source,
    new LangChainArticleClassifier(model),
    new FirebaseStorageCuratorStore(),
    logger,
  )
}
