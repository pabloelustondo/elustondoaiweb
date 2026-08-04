import { appendFile, mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { getApps, initializeApp } from 'firebase-admin/app'
import { getStorage } from 'firebase-admin/storage'
import { cloneBootstrapCuratorState } from './bootstrap-state.js'
import type {
  CuratorLogger,
  CuratorRunSummary,
  CuratorState,
  CuratorStore,
} from './contracts.js'

export class FirebaseStorageCuratorStore implements CuratorStore {
  constructor(
    private readonly statePath = 'article-curator/current.json',
    private readonly runPrefix = 'article-curator/runs',
  ) {
    if (getApps().length === 0) initializeApp()
  }

  async loadState(): Promise<CuratorState> {
    const file = getStorage().bucket().file(this.statePath)
    const [exists] = await file.exists()
    if (!exists) return cloneBootstrapCuratorState()
    const [contents] = await file.download()
    return JSON.parse(contents.toString('utf8')) as CuratorState
  }

  async saveState(state: CuratorState): Promise<void> {
    await getStorage().bucket().file(this.statePath).save(`${JSON.stringify(state, null, 2)}\n`, {
      contentType: 'application/json; charset=utf-8',
      resumable: false,
      metadata: { cacheControl: 'no-store' },
    })
  }

  async appendRunLog(run: CuratorRunSummary): Promise<void> {
    const timestamp = run.startedAt.replace(/[:.]/g, '-')
    await getStorage().bucket().file(`${this.runPrefix}/${timestamp}-${run.runId}.json`).save(
      `${JSON.stringify(run, null, 2)}\n`,
      {
        contentType: 'application/json; charset=utf-8',
        resumable: false,
        metadata: { cacheControl: 'no-store' },
      },
    )
  }
}

export class LocalFileCuratorStore implements CuratorStore {
  constructor(
    private readonly statePath: string,
    private readonly runLogPath: string,
  ) {}

  async loadState(): Promise<CuratorState> {
    try {
      return JSON.parse(await readFile(this.statePath, 'utf8')) as CuratorState
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return cloneBootstrapCuratorState()
      throw error
    }
  }

  async saveState(state: CuratorState): Promise<void> {
    await mkdir(dirname(this.statePath), { recursive: true })
    const temporaryPath = `${this.statePath}.next`
    await writeFile(temporaryPath, `${JSON.stringify(state, null, 2)}\n`, 'utf8')
    await rename(temporaryPath, this.statePath)
  }

  async appendRunLog(run: CuratorRunSummary): Promise<void> {
    await mkdir(dirname(this.runLogPath), { recursive: true })
    await appendFile(this.runLogPath, `${JSON.stringify(run)}\n`, 'utf8')
  }
}

export class ConsoleCuratorLogger implements CuratorLogger {
  info(message: string, details?: Record<string, unknown>): void {
    console.info(message, details ?? {})
  }

  warn(message: string, details?: Record<string, unknown>): void {
    console.warn(message, details ?? {})
  }

  error(message: string, details?: Record<string, unknown>): void {
    console.error(message, details ?? {})
  }
}
