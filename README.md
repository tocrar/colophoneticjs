# Colophonetic

A JavaScript-based implementation of the Cologne Phonetics algorithm. It is one of the phonetic algorithms suited for the German language. More information on it can be found on the [German Wikipedia page](http://de.wikipedia.org/wiki/Kölner_Phonetik). Words that sound similar but may be written completely differently are represented by the same numerical sequence.

One example is the popular German name "Meier" which may also be written "Mayr". In Cologne Phonetics, both are represented as 67.

## Usage as ES-Module

```js
import colophonetics from "colophonetics"

// Wikipedia's example:
var testString = "Müller-Lüdenscheidt"
console.log(colophonetics(testString))
// > 65752682

// Meier/Mayr example:
console.log(colophonetics("Meier Mayr"))
// > 67 67
```

## Usage as Common-JS

```js
const colophonetics = require("colophonetics")

// Wikipedia's example:
var testString = "Müller-Lüdenscheidt"
console.log(colophonetics(testString))
// > 65752682

// Meier/Mayr example:
console.log(colophonetics("Meier Mayr"))
// > 67 67
```
