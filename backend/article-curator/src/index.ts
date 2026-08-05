import * as functionsLogger from 'firebase-functions/logger'
import { onSchedule } from 'firebase-functions/v2/scheduler'
import type { CuratorLogger } from './article-curator/contracts.js'
import { createProductionArticleCurator } from './article-curator/production.js'

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
