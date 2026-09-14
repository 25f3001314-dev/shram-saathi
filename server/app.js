import express from 'express'
import crypto from 'node:crypto'

const app = express()
app.use(express.json({ limit: '1mb' }))

const stats = {
  requests: '12,480', voiceSessions: '9,870', languages: '14', success: '96.8%',
  escalations: '412', auth: '98.7%', response: '1.8s', cached: '7,240',
}

const responses = {
  eshram: 'eShram registration usually needs a mobile number, Aadhaar and bank details. I can guide you step by step.',
  pf: 'I can help you check PF balance, claim status, or find your UAN support options.',
  jobs: 'I found 18 nearby opportunities in the demo catalogue. A human assistant can help you shortlist them.',
}

const ok = (res, data) => res.json({ ok: true, demo: true, data })

app.get('/api/health', (_, res) => ok(res, { service: 'Shram Saathi API', status: 'ready' }))
app.get('/api/dashboard/stats', (_, res) => ok(res, stats))
app.post('/api/voice/session', (_, res) => ok(res, { sessionId: crypto.randomUUID(), provider: 'mock', mode: 'demo' }))
app.post('/api/voice/process', (req, res) => ok(res, { transcript: req.body?.text || 'Mujhe eShram mein registration karna hai.', language: 'Hindi', intent: 'eShram Registration', confidence: 0.97 }))
app.post('/api/translate', (req, res) => ok(res, { text: req.body?.text || '', provider: 'mock-translation' }))
app.post('/api/rag/query', (req, res) => ok(res, { answer: responses[req.body?.topic] || responses.eshram, source: 'Local government document set', grounded: true }))
app.post('/api/auth/:layer', (req, res) => ok(res, { layer: req.params.layer, status: 'verified', demo: true }))
app.post('/api/eshram/register', (_, res) => ok(res, { registrationId: 'DEMO-ESHRAM-2026-001', status: 'completed' }))
app.get('/api/eshram/status', (_, res) => ok(res, { status: 'Registration completed', reference: 'DEMO-ESHRAM-2026-001' }))
app.get('/api/ncs/jobs', (_, res) => ok(res, [{ title: 'Site helper', location: 'Lucknow', pay: '₹18,000 / month' }, { title: 'Machine operator', location: 'Kanpur', pay: '₹22,000 / month' }]))
app.get('/api/shram-suvidha/services', (_, res) => ok(res, ['Registration support', 'Compliance guidance', 'Application status']))
app.post('/api/human/escalate', (_, res) => ok(res, { queueId: 'DEMO-QUEUE-42', wait: '02 min', agent: 'Available' }))

export default app
