# Colophonetics

A JavaScript-based implementation of the Cologne Phonetics algorithm. It is one of the phonetic algorithms suited for the German language. More information on it can be found on the [german](https://de.wikipedia.org/wiki/Kölner_Phonetik) or [english](https://en.wikipedia.org/wiki/Cologne_phonetics) Wikipedia page. Words that sound similar but may be written completely differently are represented by the same numerical sequence.

One example is the popular German name "Meier" which may also be written "Mayr". In Cologne Phonetics, both are represented as 67.

## Why this fork?

- passes tests based on the rules of the algorithm
- faster
- common-js and es-module

## Usage

### import

```js
// import as ES-Module
import colophonetics from "colophonetics"

// or import as Common-JS
const colophonetics = require("colophonetics")
```

### strings

```js
// Wikipedia's example:
const nameString = "Müller-Lüdenscheidt"
console.log(colophonetics(testString))
// > "65752682"

// Meier/Mayr example:
console.log(colophonetics("Meier Mayr"))
// > "67 67"
```

### arrays

```js
const nameArray = ["Meier", "Mayr", "Maier"]
console.log(colophonetics(nameArray))
// > ["67", "67", "67"]

const sentence = ["The rabbit", "was to", "slow"]
console.log(colophonetics(sentence))
// > [ '2 712', '38 2', '853' ]
```
