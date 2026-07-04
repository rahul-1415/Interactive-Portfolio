import { describe, expect, it } from 'vitest'
import { existsSync } from 'node:fs'
import { portfolio } from './index'

describe('portfolio content', () => {
  it('has complete personal info', () => {
    expect(portfolio.personal.name).toBe('Rahul Babu')
    expect(portfolio.personal.email).toMatch(/^[^@]+@[^@]+\.[^@]+$/)
    expect(portfolio.personal.title.length).toBeGreaterThan(0)
  })

  it('stats agree with actual content counts', () => {
    expect(portfolio.projects).toHaveLength(portfolio.stats.projects)
    expect(portfolio.publications).toHaveLength(portfolio.stats.publications)
    expect(portfolio.certifications).toHaveLength(portfolio.stats.certifications)
  })

  it('every experience entry is presentable', () => {
    expect(portfolio.experience.length).toBeGreaterThanOrEqual(4)
    for (const job of portfolio.experience) {
      expect(job.company.length).toBeGreaterThan(0)
      expect(job.role.length).toBeGreaterThan(0)
      expect(job.bullets.length).toBeGreaterThan(0)
    }
  })

  it('every project links somewhere', () => {
    for (const project of portfolio.projects) {
      expect(
        Boolean(project.code_url || project.live_url),
        `${project.name} has no code_url or live_url`
      ).toBe(true)
    }
  })

  it('social links are https URLs', () => {
    for (const url of Object.values(portfolio.social_links)) {
      expect(url).toMatch(/^https:\/\//)
    }
  })

  it('downloadable resume exists in public/', () => {
    expect(existsSync('public/resume/Rahul-Babu-Resume.pdf')).toBe(true)
  })
})
