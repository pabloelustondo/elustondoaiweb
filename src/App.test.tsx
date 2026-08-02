import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { App } from './App'

describe('StableShell', () => {
  it('renders the principal landmarks and one page heading', () => {
    render(<App />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })

  it('provides working in-page navigation targets', () => {
    const { container } = render(<App />)
    for (const link of screen.getAllByRole('link')) {
      const href = link.getAttribute('href')
      if (href?.startsWith('#')) expect(container.querySelector(href)).toBeInTheDocument()
    }
  })

  it('moves keyboard focus to main content when the skip link is activated', async () => {
    const user = userEvent.setup()
    render(<App />)

    const skipLink = screen.getByRole('link', { name: /skip to main content/i })
    await user.tab()
    expect(skipLink).toHaveFocus()
    await user.keyboard('{Enter}')

    expect(screen.getByRole('main')).toHaveFocus()
  })

  it('opens and closes mobile navigation accessibly', async () => {
    const user = userEvent.setup()
    render(<App />)
    const control = screen.getByRole('button', { name: /primary navigation/i })
    expect(control).toHaveAttribute('aria-expanded', 'false')
    await user.click(control)
    expect(control).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getAllByRole('link', { name: 'Home' })[0]).toHaveFocus()
    await user.keyboard('{Escape}')
    expect(control).toHaveAttribute('aria-expanded', 'false')
    expect(control).toHaveFocus()
  })

  it('has no automated accessibility violations in the homepage state', async () => {
    const { container } = render(<App />)
    expect((await axe(container)).violations).toHaveLength(0)
  })
})
