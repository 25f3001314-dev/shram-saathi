# Contributing to Shram Saathi

Thank you for helping make labour services more accessible. Keep changes modular, testable and honest about what is simulated.

## Local development

1. Copy `.env.example` to `.env` when local configuration is needed.
2. Run `npm install`.
3. Run `npm run dev`.
4. Run `npm run lint`, `npm test`, and `npm run build` before opening a pull request.

Never add real worker information, Aadhaar numbers, API keys, tokens or credentials. New integrations should implement an interface beside the mock adapter and retain a safe demo fallback.