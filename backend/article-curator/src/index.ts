import * as functionsLogger from 'firebase-functions/logger'
import { onRequest } from 'firebase-functions/v2/https'
import { onSchedule } from 'firebase-functions/v2/scheduler'
import type { CuratorLogger } from './article-curator/contracts.js'
import { createProductionArticleCurator } from './article-curator/production.js'
import { toPublicCatalog } from './article-curator/public-catalog.js'
import { FirebaseStorageCuratorStore } from './article-curator/store.js'

const logger: CuratorLogger = {
  info: (message, details) => functionsLogger.info(message, details),
  warn: (message, details) => functionsLogger.warn(message, details),
  error: (message, details) => functionsLogger.error(message, details),
}

export const curateMediumArticles = onSchedule(
  {
    schedule: 'every 15 minutes',
    timeZone: 'America/Toronto',
    region: 'northamerica-northeast1',
    memory: '512MiB',
    timeoutSeconds: 180,
    concurrency: 1,
    maxInstances: 1,
  },
  async () => {
    await createProductionArticleCurator(logger).run()
  },
)

export const articles = onRequest(
  {
    region: 'northamerica-northeast1',
    memory: '256MiB',
    timeoutSeconds: 30,
    maxInstances: 2,
  },
  async (request, response) => {
    if (request.method !== 'GET') {
      response.status(405).set('allow', 'GET').json({ error: 'Method not allowed.' })
      return
    }

    try {
      const state = await new FirebaseStorageCuratorStore().loadState()
      response
        .status(200)
        .set('cache-control', 'public, max-age=300, stale-while-revalidate=600')
        .json(toPublicCatalog(state))
    } catch (error) {
      logger.error('Public article catalog could not be served.', {
        errorName: error instanceof Error ? error.name : 'UnknownError',
        message: error instanceof Error ? error.message : 'Unknown catalog failure.',
      })
      response.status(503).set('cache-control', 'no-store').json({ error: 'Article catalog is temporarily unavailable.' })
    }
  },
)
