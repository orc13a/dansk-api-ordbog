# dansk-api-ordbog 🇩🇰

A REST API for looking up Danish words, built with Node.js and Express. Returns word data including casing variants, inflections, word classes, and a direct link to the word's entry on [ordnet.dk](https://ordnet.dk).

---

## Project Structure

```
dansk-api-ordbog/
├── server.js                  # Entry point — starts the Express server
├── routes/
│   └── api.js                 # API route definitions
├── classes/
│   └── Word.js                # Word class definition
├── sorting/
│   ├── createWordsFile.js     # Populates letter-array JSON files from word lists
│   ├── clearWordFile.js       # Clears all letter-array JSON files
│   └── clearLetterArrays.js   # Utility to reset letter arrays
├── words/
│   ├── letters.json           # List of all 29 supported letters (A-Z + Æ, Ø, Å)
│   ├── letter-arrays/         # One JSON file per letter, holds Word objects
│   └── word-files/            # Source word list text files
└── ASCII/
    ├── ASCII-chars.txt        # Raw character list
    ├── ASCII-sheet.json       # Character-to-code mapping
    └── makeASCIIsheet.js      # Script that generates ASCII-sheet.json
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Populate the word database

This reads the word list and fills the letter-array JSON files:

```bash
node sorting/createWordsFile.js
```

You should see:
```
==> Clearing of letter-arrays has started
==> 29 letter-array files cleared successfully
==> The creation of letter-arrays has started
==> Done! 366801 words written across 30 letter files.
```

### 3. Start the server

```bash
npm start
```

The server runs on port `8080` by default (configurable via `.env`).

---

## API Endpoints

### `GET /api`

Returns the API base info and available endpoints.

**Example request:**
```
GET http://localhost:8080/api
```

**Example response:**
```json
{
  "word_url": "http://localhost:8080/api/word/{word}"
}
```

---

### `GET /api/word/:word`

Looks up a Danish word and returns its full Word object.

**Example request:**
```
GET http://localhost:8080/api/word/hund
```

**Example response:**
```json
{
  "word": "hund",
  "word_upperCase": "HUND",
  "word_lowerCase": "hund",
  "word_classes": [],
  "word_inflections": [],
  "word_meaning_url": "https://ordnet.dk/ddo/ordbog?query=hund"
}
```

**Supports Danish characters** — Æ, Ø, Å work correctly:
```
GET http://localhost:8080/api/word/øjne
```

**Error responses:**

| Status | Meaning |
|--------|---------|
| `404` | Word not found in the database |
| `500` | Internal server error |

---

## Word Object

Each word is stored and returned as a `Word` object with the following fields:

| Field | Description |
|-------|-------------|
| `word` | The word as stored in the source list |
| `word_upperCase` | Uppercase version |
| `word_lowerCase` | Lowercase version |
| `word_classes` | Array of word classes (e.g. noun, verb) — empty if not provided |
| `word_inflections` | Array of inflected forms (e.g. plural) — empty if not provided |
| `word_meaning_url` | Direct link to the word's entry on ordnet.dk |

---

## Word Data

The word database comes from `words/word-files/wordList-1.txt` — a flat list of ~366,800 Danish words, one per line. This includes base forms, inflections, abbreviations, and proper nouns.

Words are indexed by their first letter into individual JSON files under `words/letter-arrays/` (e.g. all words starting with H go into `H.json`). This keeps lookups fast without a database.

---

## Development

To run the server with auto-restart on file changes:

```bash
npm run dev
```

This uses `nodemon`, which is included as a dev dependency.

---

## Tech Stack

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [nodemon](https://nodemon.io/) (dev only)
