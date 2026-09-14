# Shram Saathi

> **Voice-First AI Middleware for Accessibility & Inclusive Labour Technology**

Shram Saathi is a **Voice-First AI Middleware** designed to make government labour services accessible to workers who face barriers caused by text-heavy interfaces, language limitations, unreliable biometric authentication, and limited digital literacy.

Instead of creating another database or replacing existing government platforms, Shram Saathi acts as an **AI Gateway** connecting workers with existing labour systems such as **eShram, NCS, and Shram Suvidha** through compliant APIs.

### Core Idea

**Bolo → Samjho → Pao → Apne Adhikar**

Workers should be able to access important labour services simply by speaking in their own language.

---

## Problem Statement

Workers interacting with labour portals face three major accessibility barriers:

1. **Text-heavy interfaces**  
   Important information is primarily presented as text, making digital services difficult to use for workers with limited literacy.

2. **Biometric authentication failures**  
   Biometric identification can fail because of worn fingerprints, environmental conditions, device limitations, or other operational issues.

3. **Language barriers**  
   Many workers are more comfortable communicating in regional Indian languages, while government portals may not provide the same level of accessibility across languages.

Shram Saathi addresses these barriers through a voice-first, multilingual, assisted-access architecture.

---

# What We Are Building

Shram Saathi provides a unified accessibility layer through:

- WhatsApp
- Toll-Free IVR
- Missed-Call workflows
- CSC Kiosks
- Voice interaction
- Regional-language support
- Assisted authentication
- Human escalation

### Zero-App Approach

The worker does **not need to download a new application**.

The system is designed to work through familiar channels such as WhatsApp, IVR and CSC infrastructure.

---

# High-Level Architecture

```text
                         ┌─────────────────────────┐
                         │       WORKER            │
                         │ Voice / Regional Lang.  │
                         └────────────┬────────────┘
                                      │
              ┌───────────────────────┼────────────────────────┐
              │                       │                        │
          WhatsApp                   IVR                 CSC Kiosk
              │                       │                        │
              └───────────────────────┼────────────────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │     API / AI Gateway    │
                         └────────────┬────────────┘
                                      │
                         ┌────────────▼────────────┐
                         │ Voice & Language Layer  │
                         │ BHASHINI + Sarvam Edge │
                         └────────────┬────────────┘
                                      │
                         ┌────────────▼────────────┐
                         │ Noise Cancellation      │
                         │ DeepFilterNet 3         │
                         └────────────┬────────────┘
                                      │
                         ┌────────────▼────────────┐
                         │ Translation             │
                         │ IndicTrans2              │
                         └────────────┬────────────┘
                                      │
                         ┌────────────▼────────────┐
                         │ Conversational AI       │
                         │ Quantized LLM + PostRAG │
                         └────────────┬────────────┘
                                      │
                         ┌────────────▼────────────┐
                         │ Security & Authentication│
                         │ Voice + Camera + OTP    │
                         └────────────┬────────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    │                 │                 │
                    ▼                 ▼                 ▼
                 eShram              NCS        Shram Suvidha
```

---

# Key Features

## 1. Voice-First Interaction

Workers can communicate naturally using voice instead of navigating complex text interfaces.

Example:

> "Mujhe eShram mein registration karna hai."

The system interprets the request and guides the worker through the required process.

---

## 2. Multilingual Accessibility

The architecture is designed for Indian regional languages using:

- **BHASHINI**
- **Sarvam Edge**
- **IndicTrans2**
- Regional-language conversational AI

The goal is to allow workers to interact in the language they are most comfortable speaking.

---

## 3. Offline Voice Capability

**Sarvam Edge** is proposed for offline speech recognition.

Target characteristics from the project design:

- 22+ languages
- Approximately 60 MB footprint
- Offline operation
- Approximately 150–250 ms ASR latency target

This is particularly useful in low-connectivity environments.

---

## 4. Construction-Site Noise Handling

Workers may use the system in noisy environments.

**DeepFilterNet 3** is used as the proposed noise-cancellation layer to improve speech quality before ASR processing.

Target from the project design:

- SNR improvement: approximately +8 to +12 dB
- Designed to improve speech recognition in construction-site noise

---

## 5. Translation

The proposed translation layer uses:

### IndicTrans2

Target benchmark values from the project design:

- BLEU: 38.4
- chrF++: 54.2
- FLORES-200 evaluation

**IndicTrans3-beta** is considered as a backup translation option.

---

## 6. Government-Document Grounded AI

The conversational engine combines:

- Quantized LLM
- PostRAG
- Government document retrieval

The intended behavior is that answers are grounded in authorized government documents rather than unrestricted model-generated information.

---

# 7. Semantic Caching

Approximately 70% of worker queries are expected to be repetitive.

Shram Saathi proposes **Qdrant semantic caching** so frequently repeated queries can be answered without invoking the LLM every time.

### Expected benefit

- Reduced LLM usage
- Lower compute cost
- Lower response latency
- Target reduction of approximately 60% in compute/latency for cached workloads

---

# 8. OCR Pipeline

For documents, certificates and photographed information, the proposed OCR stack includes:

```text
Image
  │
  ▼
OpenCV
  │
  ▼
CRAFT
  │
  ▼
Tesseract
  │
  ▼
LayoutLMv3
  │
  ▼
Structured Information
```

Target OCR accuracy from the project design:

**~91–93%**

---

# 9. Three-Layer Authentication

Shram Saathi proposes multiple authentication signals.

### Layer 1 — Voice Liveness

Designed to detect whether the interaction is coming from a live speaker rather than a replay or synthetic/deepfake voice.

Target metrics:

- EER: ~1.2%
- Deepfake detection: ~96.4%

### Layer 2 — Camera Liveness

Camera-based presentation-attack detection is proposed for assisted environments.

Target:

- ISO 30107-3 PAD Level 2
- BPCER <2%

### Layer 3 — OTP

OTP provides an additional authentication factor.

For workers who cannot independently read an OTP, a CSC/VLE operator can assist by reading it aloud while the authentication decision remains tied to the configured authentication flow.

### Combined Security Targets

Project design targets:

- FAR <0.01%
- Injection Attack Success <0.001%

> These values are engineering targets and must be independently validated through security testing before being treated as production guarantees.

---

# 10. Aadhaar & Data Protection

The architecture is designed around privacy-by-design principles.

### Proposed security controls

- AES-256-GCM
- TLS 1.3
- Automatic sensitive-data masking
- Aadhaar masking example:
  `XXXX-XXXX-1234`
- Processing only after auto-masking where applicable

The proposed architecture targets alignment with:

- DPDP framework
- GIGW 3.0
- STQC security/accessibility requirements

> Actual compliance requires formal assessment, documentation, audits and approval by the relevant authorities.

---

# 11. Human-in-the-Loop Co-Pilot

Shram Saathi is not designed to leave a worker alone with a bot.

A **Co-Pilot / Human Escalation Layer** can analyze conversation signals and identify potentially distressed or difficult interactions.

When escalation is required:

```text
Worker
  ↓
AI Conversation
  ↓
Sentiment / Distress Detection
  ↓
Human Agent / VLE
  ↓
Worker Assistance
```

A CSC/VLE remains available for assisted service delivery.

---

# Government System Integration

Shram Saathi is intended to operate as a middleware layer rather than replacing existing government databases.

```text
                  SHRAM SAATHI
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
     eShram            NCS       Shram Suvidha
```

The proposed integration approach uses APIs and an accessibility gateway rather than maintaining a parallel worker database.

---

# User Journey

### Example: eShram Registration

```text
1. Worker opens WhatsApp / uses IVR / visits CSC
                    ↓
2. Worker speaks in their preferred language
                    ↓
3. Speech is cleaned and converted to text
                    ↓
4. Language is detected / translated
                    ↓
5. AI understands the request
                    ↓
6. Government documents provide grounded guidance
                    ↓
7. Authentication is performed
                    ↓
8. Required government service is accessed
                    ↓
9. Worker receives confirmation
```

---

# Technology Stack

| Layer | Technology |
|---|---|
| Voice / Language | BHASHINI + VoicERA |
| Offline ASR | Sarvam Edge |
| Noise Cancellation | DeepFilterNet 3 |
| Translation | IndicTrans2 / IndicTrans3-beta |
| Conversational AI | Quantized LLM + PostRAG |
| Semantic Cache | Qdrant |
| OCR | Tesseract + CRAFT + LayoutLMv3 + OpenCV |
| Authentication | Voice Liveness + Camera Liveness + OTP |
| Encryption | AES-256-GCM |
| Transport Security | TLS 1.3 |
| Government Integration | API Gateway |
| Assisted Access | WhatsApp / IVR / CSC |

---

# Accessibility Channels

| Channel | Purpose |
|---|---|
| WhatsApp | Familiar voice/chat interface |
| Toll-Free IVR | Phone-based access |
| Missed Call | Low-friction entry point |
| CSC Kiosk | Assisted access through VLE |
| Voice | Primary interaction method |
| Regional Languages | Inclusive communication |

---

# Worker Benefits

### 🗣️ Speak Instead of Type

Workers can request services using their voice.

### 🌐 Regional Language Support

The system is designed around multilingual interaction.

### 📱 No New App Required

Workers can use existing communication channels.

### 🔐 Alternative to Failed Biometrics

The proposed authentication flow provides additional authentication mechanisms when biometric interaction fails.

### 🤝 Human Assistance

Complex or distressed conversations can be escalated to a human agent/VLE.

### ♿ Inclusive by Design

The project focuses on accessibility for workers with limited literacy, language barriers and low digital familiarity.

---

# Project Goals

Shram Saathi aims to make labour services:

- **Accessible**
- **Multilingual**
- **Voice-first**
- **Secure**
- **Privacy-aware**
- **Low-bandwidth friendly**
- **Human-assisted**
- **Easy to use**

---

# Repository Structure

A suggested repository structure:

```text
shram-saathi/
│
├── README.md
├── LICENSE
├── .gitignore
├── .env.example
│
├── frontend/
│   └── ...
│
├── backend/
│   └── ...
│
├── ai/
│   ├── voice/
│   ├── translation/
│   ├── rag/
│   ├── ocr/
│   ├── authentication/
│   └── semantic-cache/
│
├── integrations/
│   ├── eshram/
│   ├── ncs/
│   └── shram-suvidha/
│
├── docs/
│   ├── architecture/
│   ├── security/
│   ├── api/
│   └── research/
│
├── diagrams/
│   ├── architecture.png
│   ├── security.png
│   └── user-flow.png
│
└── tests/
    ├── voice/
    ├── translation/
    ├── api/
    └── security/
```

---

# Architecture Diagrams

The repository can include:

- System architecture
- Technical architecture
- Authentication architecture
- Data flow diagram
- User journey
- Security architecture
- API integration diagram

---

# Development Roadmap

## Phase 1 — Prototype

- Voice input
- Language detection
- Basic multilingual conversation
- Government-document RAG
- Basic WhatsApp/IVR interface

## Phase 2 — Accessibility Layer

- Offline ASR
- Noise cancellation
- OCR
- Regional language expansion
- Semantic caching

## Phase 3 — Authentication

- Voice liveness
- Camera liveness
- OTP flow
- Security testing

## Phase 4 — Government Integration

- API gateway
- eShram integration
- NCS integration
- Shram Suvidha integration
- Audit logging

## Phase 5 — Pilot

- CSC/VLE workflow
- Real-world worker testing
- Low-connectivity testing
- Noise testing
- Accessibility testing
- Security and compliance assessment

---

# Important Note

Shram Saathi is a proposed technical solution / prototype architecture.

References to government systems, APIs, standards, security metrics, latency, accuracy and compliance represent the **project design and engineering targets** unless independently verified and formally approved.

Production deployment would require:

- Authorized government API access
- Security audits
- Privacy impact assessment
- Accessibility testing
- Model validation
- Infrastructure testing
- Legal and regulatory review
- Formal integration approval

---

# Vision

> **Every worker should be able to access their rights without needing to read, type, download an app, or understand complex digital systems.**

**Shram Saathi — Har Mazdoor Ka Adhikar, Ab Awaaz Mein.**

---

## Status

🚧 **Prototype / Hackathon Project**

Built around the theme:

**Accessibility & Inclusive Technology**

