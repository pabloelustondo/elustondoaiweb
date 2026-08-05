import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { normalizeArticleSource } from '../frontend/src/content/articles/articleSourceSnapshot.ts'

const repositoryRoot = resolve(fileURLToPath(new URL('..', import.meta.url)))
const fixturePath = resolve(repositoryRoot, 'frontend/src/content/articles/approvedMediumListFixture.json')
const approvedSnapshotPath = resolve(repositoryRoot, 'frontend/src/content/articles/approvedArticleSnapshot.json')
const defaultOutput = resolve(repositoryRoot, 'docs/SDLC2/07-planning/sprints/sprint-003-intelligent-article-discovery/evidence/content-refresh')
const outputFlag = process.argv.indexOf('--output')
const outputDirectory = outputFlag >= 0 && process.argv[outputFlag + 1]
  ? resolve(process.cwd(), process.argv[outputFlag + 1])
  : defaultOutput

const fixture = JSON.parse(await readFile(fixturePath, 'utf8'))
const approvedArticleSnapshot = JSON.parse(await readFile(approvedSnapshotPath, 'utf8'))
const refreshedAt = fixture.capturedAt
const result = normalizeArticleSource(fixture.records, approvedArticleSnapshot, refreshedAt)

await mkdir(outputDirectory, { recursive: true })

if (!result.ok) {
  await writeFile(resolve(outputDirectory, 'refresh-failure.json'), `${JSON.stringify(result.issues, null, 2)}\n`)
  console.error('Article refresh validation failed. The approved snapshot was not changed.')
  process.exitCode = 1
} else {
  await writeFile(resolve(outputDirectory, 'candidate-article-snapshot.json'), `${JSON.stringify(result.candidate, null, 2)}\n`)
  await writeFile(resolve(outputDirectory, 'article-source-diff.json'), `${JSON.stringify({ publicationDecision: result.publicationDecision, ...result.diff }, null, 2)}\n`)
  console.log(`Validated ${result.candidate.articles.length} approved-list records.`)
  console.log(`Publication decision: ${result.publicationDecision}.`)
  console.log('The approved application snapshot was not modified; review the candidate and diff before promotion.')
}
