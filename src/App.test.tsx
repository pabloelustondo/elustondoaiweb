import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { App } from './App'

function renderAt(path: string) {
  window.history.replaceState(null, '', path)
  return render(<App />)
}

describe('StableShell routes', () => {
  beforeEach(() => window.history.replaceState(null, '', '/'))
  afterEach(() => window.history.replaceState(null, '', '/'))

  it.each([
    ['/', 'Spec-driven AI-assisted software engineering, solution architecture, agentic systems, and modernization.'],
    ['/articles', 'Articles'],
    ['/projects', 'Projects'],
    ['/methods', 'Methods'],
    ['/people', 'People'],
    ['/about', 'About Elustondo.ai'],
    ['/contact', 'Contact'],
  ])('renders %s as a permanent route', (path, heading) => {
    renderAt(path)
    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })

  it('navigates without a document reload and marks the current page', async () => {
    const user = userEvent.setup()
    renderAt('/')
    const articlesLink = within(screen.getByRole('navigation', { name: 'Primary navigation' })).getByRole('link', { name: 'Articles' })
    await user.click(articlesLink)

    expect(window.location.pathname).toBe('/articles')
    expect(articlesLink).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('heading', { level: 1, name: 'Articles' })).toBeInTheDocument()
  })

  it('responds to browser history changes', () => {
    renderAt('/articles')
    act(() => {
      window.history.pushState(null, '', '/projects')
      window.dispatchEvent(new PopStateEvent('popstate'))
    })
    expect(screen.getByRole('heading', { level: 1, name: 'Projects' })).toBeInTheDocument()

    act(() => {
      window.history.replaceState(null, '', '/articles')
      window.dispatchEvent(new PopStateEvent('popstate'))
    })
    expect(screen.getByRole('heading', { level: 1, name: 'Articles' })).toBeInTheDocument()
  })

  it('moves keyboard focus to main content on every permanent route', async () => {
    const user = userEvent.setup()
    renderAt('/methods')
    const skipLink = screen.getByRole('link', { name: 'Skip to main content' })
    await user.tab()
    expect(skipLink).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(screen.getByRole('main')).toHaveFocus()
  })

  it('opens and closes mobile navigation accessibly', async () => {
    const user = userEvent.setup()
    renderAt('/')
    const control = screen.getByRole('button', { name: 'primary navigation' })
    expect(control).toHaveAttribute('aria-expanded', 'false')
    await user.click(control)
    expect(control).toHaveAttribute('aria-expanded', 'true')
    expect(within(screen.getByRole('navigation', { name: 'Primary navigation' })).getByRole('link', { name: 'Home' })).toHaveFocus()
    await user.keyboard('{Escape}')
    expect(control).toHaveAttribute('aria-expanded', 'false')
    expect(control).toHaveFocus()
  })

  it('renders an accessible branded not-found page', async () => {
    const { container } = renderAt('/not-a-real-page')
    expect(screen.getByRole('heading', { level: 1, name: 'Page not found' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Return home' })).toHaveAttribute('href', '/')
    expect((await axe(container)).violations).toHaveLength(0)
  })

  it('has no automated accessibility violations on every permanent route', async () => {
    for (const path of ['/', '/articles', '/projects', '/methods', '/people', '/about', '/contact']) {
      const view = renderAt(path)
      expect((await axe(view.container)).violations).toHaveLength(0)
      view.unmount()
    }
  })
})
