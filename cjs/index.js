/*
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Rules: 
H => -
A, E, I, J, O, U, Y	=> 0
B => 1
F, V, W	=> 3
G, K, Q	 => 4
L => 5
M, N => 6
R => 7
S, Z => 8
P (not before H) => 1
P (before H) => 3
X (not after C, K, Q) => 48
X (after C, K, Q) => 8
D, T (not before C, S, Z) => 2
D, T (before C, S, Z) => 8
C (after S, Z) => 8
C (in the initial sound before A, H, K, L, O, Q, R, U, X) => 4
C (before A, H, K, O, Q, U, X except after S, Z) => 4
C (in initial position except before A, H, K, L, O, Q, R, U, X) => 8
C (not before A, H, K, O, Q, U, X) => 8
*/

if (!String.prototype.replaceAll) {
    console.log("added replaceAll to String")
    String.prototype.replaceAll = function (search, replacement) {
        var target = this
        return target.replace(new RegExp(search, "g"), replacement)
    }
}

function rules(letter, pre, post) {
    switch (letter) {
        case "h":
            return -1

        case "a":
        case "e":
        case "i":
        case "o":
        case "u":
        case "j":
        case "y":
            return 0

        case "b":
            return 1

        case "f":
        case "v":
        case "w":
            return 3

        case "g":
        case "k":
        case "q":
            return 4

        case "l":
            return 5

        case "m":
        case "n":
            return 6

        case "r":
            return 7

        case "s":
        case "z":
            return 8

        case "p":
            return post === "h" ? 3 : 1

        case "x":
            return "ckq".includes(pre) ? 8 : 48

        case "d":
        case "t":
            return "csz".includes(post) ? 8 : 2

        case "c":
            if ("sz".includes(pre)) return 8
            if ("ahkoqux".includes(post)) return 4
            if (pre === undefined && "lr".includes(post)) return 4
            return 8
    }
    return null
}

const substitutions = {
    ä: "a",
    ö: "o",
    ü: "u",
    ß: "ss",
    é: "e",
    è: "e",
    á: "a",
    à: "a",
}

function substitute(word) {
    for (let s in substitutions) {
        word = word.replaceAll(s, substitutions[s])
    }
    return word
}

function colophonetics(words) {
    if (typeof words !== "string") {
        throw new TypeError(`Expected string, got ${typeof words}`)
    }

    let word = words.trim().toLowerCase()

    if (!word) return ""

    const sentence = words.split(" ")
    if (sentence.length > 1) {
        return sentence.map((word) => colophonetics(word)).join(" ")
    }

    word = substitute(word)

    const result = []
    let past = -1
    for (let i = 0; i < word.length; i++) {
        let val = rules(word[i], word[i - 1], word[i + 1])
        if (val != null && val != past) {
            past = val
            if (val === 0 && result.length !== 0) continue
            if (val != -1) result.push(val)
            continue
        }
    }

    return result.join("")
}

module.exports = colophonetics
