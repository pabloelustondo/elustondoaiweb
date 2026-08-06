import { ChatGoogle } from '@langchain/google/node'
import { ArticleCurator } from './curator.js'
import { LangChainArticleClassifier } from './langchain-classifier.js'
import { MediumProfileRssReader } from './medium-source.js'
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

  return new ArticleCurator(
    new MediumProfileRssReader(),
    new LangChainArticleClassifier(model),
    new FirebaseStorageCuratorStore(),
    logger,
  )
}
