export type LanguageCode = 'hi' | 'en' | 'bho' | 'mai' | 'mr' | 'ta' | 'te' | 'bn' | 'gu' | 'kn' | 'pa' | 'or'
export type DistressState = 'NORMAL' | 'CONFUSED' | 'DISTRESSED'

export interface VoiceResult { transcript: string; language: LanguageCode; confidence: number }
export interface VoiceProvider { readonly name: string; transcribe(audio: Blob): Promise<VoiceResult> }
export interface TranslationProvider { readonly name: string; translate(text: string, from: LanguageCode, to: LanguageCode): Promise<string> }
export interface RAGAnswer { answer: string; source: string; grounded: boolean }
export interface RAGService { query(question: string): Promise<RAGAnswer> }
export interface SemanticCacheService { get(query: string): string | undefined; set(query: string, response: string): void; size(): number }
export interface OCRService { extractText(image: Blob): Promise<{ text: string; fields: Record<string, string> }> }
export interface GovernmentService<TRequest, TResponse> { register(request: TRequest): Promise<TResponse> }
export interface AuthenticationService { verify(layer: 'voice' | 'camera' | 'otp'): Promise<{ verified: boolean; demo: boolean }> }

export class MockVoiceProvider implements VoiceProvider {
  readonly name = 'mock-voice'
  async transcribe(_audio: Blob): Promise<VoiceResult> { return { transcript: 'Mujhe eShram mein registration karna hai.', language: 'hi', confidence: 0.97 } }
}

export class MockTranslationProvider implements TranslationProvider {
  readonly name = 'mock-translation'
  async translate(text: string): Promise<string> { return text }
}

export class LocalRAGService implements RAGService {
  async query(question: string): Promise<RAGAnswer> {
    if (!question.trim()) return { answer: 'I do not have verified information for this request. Please speak with a human assistant.', source: 'No matching document', grounded: false }
    return { answer: 'eShram registration guidance is available in the demo knowledge base.', source: 'Local government document set', grounded: true }
  }
}

export class InMemorySemanticCache implements SemanticCacheService {
  private readonly entries = new Map<string, string>()
  get(query: string) { return this.entries.get(query.trim().toLowerCase()) }
  set(query: string, response: string) { this.entries.set(query.trim().toLowerCase(), response) }
  size() { return this.entries.size }
}

export class MockOCRService implements OCRService {
  async extractText(_image: Blob) { return { text: 'DEMO WORKER DOCUMENT', fields: { identifier: 'MASKED-DEMO-001' } } }
}

export class MockAuthenticationService implements AuthenticationService {
  async verify(_layer: 'voice' | 'camera' | 'otp') { return { verified: true, demo: true } }
}