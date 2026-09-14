import { describe, expect, it } from 'vitest'
import { InMemorySemanticCache, LocalRAGService, MockAuthenticationService, MockVoiceProvider } from './contracts'

describe('Shram Saathi demo services', () => {
  it('returns the scripted voice journey without external credentials', async () => {
    const result = await new MockVoiceProvider().transcribe(new Blob(['demo']))
    expect(result.language).toBe('hi')
    expect(result.transcript).toContain('eShram')
  })

  it('refuses to invent an answer when no question is available', async () => {
    const result = await new LocalRAGService().query('')
    expect(result.grounded).toBe(false)
    expect(result.answer).toContain('human assistant')
  })

  it('normalizes repeated cache queries', () => {
    const cache = new InMemorySemanticCache()
    cache.set('  PF STATUS ', 'Demo response')
    expect(cache.get('pf status')).toBe('Demo response')
    expect(cache.size()).toBe(1)
  })

  it('marks every authentication response as demo data', async () => {
    await expect(new MockAuthenticationService().verify('otp')).resolves.toEqual({ verified: true, demo: true })
  })
})