import { spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

describe('content refresh command', () => {
  it('runs through tsx when native TypeScript stripping is disabled', () => {
    const repositoryRoot = fileURLToPath(new URL('../../../../', import.meta.url))
    const outputDirectory = mkdtempSync(join(tmpdir(), 'content-refresh-test-'))

    try {
      const result = spawnSync(
        'pnpm',
        ['content:refresh', '--output', outputDirectory],
        {
          cwd: repositoryRoot,
          encoding: 'utf8',
          env: { ...process.env, NODE_OPTIONS: '--no-experimental-strip-types' },
        },
      )

      expect(result.status, `${result.stdout}\n${result.stderr}`).toBe(0)
      expect(JSON.parse(readFileSync(join(outputDirectory, 'article-source-diff.json'), 'utf8'))).toMatchObject({
        publicationDecision: 'UNCHANGED',
      })
    } finally {
      rmSync(outputDirectory, { recursive: true, force: true })
    }
  })
})
