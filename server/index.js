import express from 'express'
import app from './app.js'
const port = process.env.PORT || 8787
app.use(express.static('dist'))
app.listen(port, () => console.log(`Shram Saathi API listening on http://localhost:${port}`))