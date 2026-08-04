import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ArticleCurator } from './article-curator/curator.js'
import { DeterministicFixtureClassifier } from './article-curator/langchain-classifier.js'
import { FixtureMediumCatalogSource } from './article-curator/medium-source.js'
import { ConsoleCuratorLogger, LocalFileCuratorStore } from './article-curator/store.js'
import { mediumListWithoutThreeAmigos } from './local-fixtures.js'

const functionsRoot = resolve(fileURLToPath(new URL('..', import.meta.url)))
const localDirectory = process.env.CURATOR_LOCAL_DIRECTORY
  ? resolve(process.env.CURATOR_LOCAL_DIRECTORY)
  : resolve(functionsRoot, '.local')
const store = new LocalFileCuratorStore(
  resolve(localDirectory, 'article-curator-state.json'),
  resolve(localDirectory, 'article-curator-runs.jsonl'),
)
const curator = new ArticleCurator(
  new FixtureMediumCatalogSource(mediumListWithoutThreeAmigos),
  new DeterministicFixtureClassifier(),
  store,
  new ConsoleCuratorLogger(),
)
const runCount = process.argv.includes('--twice') ? 2 : 1

for (let index = 0; index < runCount; index += 1) {
  const result = await curator.run()
  console.info(`Local curator run ${index + 1}/${runCount}: ${result.status} — ${result.message}`)
}

const state = await store.loadState()
console.info(`Local catalog now contains ${state.articles.length} article(s).`)
console.info(`Current article IDs: ${state.articles.map((article) => article.sourceId).join(', ')}`)
