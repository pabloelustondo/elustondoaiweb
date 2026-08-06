import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { cloneBootstrapCuratorState } from './bootstrap-state.js'
import type { CuratorRunSummary } from './contracts.js'
import { FirebaseStorageCuratorStore, LocalFileCuratorStore } from './store.js'

const temporaryDirectories: string[] = []

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) => (
    rm(directory, { recursive: true, force: true })
  )))
})

function successfulRun(): CuratorRunSummary {
  return {
    runId: 'run-003',
    startedAt: '2026-08-05T12:00:00.000Z',
    completedAt: '2026-08-05T12:00:01.000Z',
    status: 'UNCHANGED',
    discoveredCount: 5,
    addedArticleIds: [],
    removedArticleIds: [],
    pendingRemovalArticleIds: [],
    classifiedArticleIds: [],
    message: 'Validated catalog is unchanged.',
  }
}

class MemoryBucket {
  readonly objects = new Map<string, string>()

  file(path: string) {
    return {
      exists: async (): Promise<[boolean]> => [this.objects.has(path)],
      download: async (): Promise<[Buffer]> => [Buffer.from(this.objects.get(path) ?? '', 'utf8')],
      save: async (contents: string): Promise<void> => {
        this.objects.set(path, contents)
      },
    }
  }
}

describe('curator stores', () => {
  it('rejects invalid local persisted state at the load boundary', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'curator-store-test-'))
    temporaryDirectories.push(directory)
    const statePath = join(directory, 'state.json')
    await writeFile(statePath, JSON.stringify({ ...cloneBootstrapCuratorState(), schemaVersion: 2 }), 'utf8')
    const store = new LocalFileCuratorStore(statePath, join(directory, 'runs.jsonl'))

    await expect(store.loadState()).rejects.toThrow('failed runtime validation')
  })

  it('atomically includes the required run record in local current state', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'curator-store-test-'))
    temporaryDirectories.push(directory)
    const statePath = join(directory, 'state.json')
    const store = new LocalFileCuratorStore(statePath, join(directory, 'runs.jsonl'))
    const state = cloneBootstrapCuratorState()
    const run = successfulRun()

    await store.commitState(state, run)

    expect(JSON.parse(await readFile(statePath, 'utf8')).lastRun).toEqual(run)
    expect((await store.loadState()).lastRun).toEqual(run)
  })

  it('rejects invalid Firebase object state at the adapter load boundary', async () => {
    const bucket = new MemoryBucket()
    bucket.objects.set('state.json', JSON.stringify({ ...cloneBootstrapCuratorState(), sourceCollection: 'https://example.com' }))
    const store = new FirebaseStorageCuratorStore('state.json', 'runs', () => bucket)

    await expect(store.loadState()).rejects.toThrow('failed runtime validation')
  })

  it('writes the required run record with the Firebase current-state object', async () => {
    const bucket = new MemoryBucket()
    const store = new FirebaseStorageCuratorStore('state.json', 'runs', () => bucket)
    const run = successfulRun()

    await store.commitState(cloneBootstrapCuratorState(), run)

    expect(JSON.parse(bucket.objects.get('state.json') ?? '').lastRun).toEqual(run)
    await store.appendAuditLog(run)
    expect([...bucket.objects.keys()].some((path) => path.startsWith('runs/'))).toBe(true)
  })
})
