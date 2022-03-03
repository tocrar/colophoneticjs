/* 
(The MIT License)

Copyright (c) 2011-2013 Jörg Tillmann <colophonetics@joergtillmann.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Original: https://github.com/jtillmann/colophoneticjs

 */
const substitution = { ä: "a", ö: "o", ü: "u", ß: "ss", ph: "f" }
const exceptions_leading = {
    4: ["ca", "ch", "ck", "cl", "co", "cq", "cu", "cx"],
    8: ["dc", "ds", "dz", "tc", "ts", "tz"],
}
const exceptions_following = ["sc", "zc", "cx", "kx", "qx"]
const coding_table = {
    0: "aeijouy",
    1: "bp",
    2: "dt",
    3: "fvw",
    4: "cgkq",
    48: "x",
    5: "l",
    6: "mn",
    7: "r",
    8: "csz",
}

export default function colophonetics(word) {
    if (typeof word === "string" && word.trim().includes(" ")) {
        word = word.split(" ")
    }

    if (typeof word === "object") {
        return Array.from(word)
            .map((words) => {
                return colophonetics(words)
            })
            .join(" ")
    }

    if (typeof word !== "string") {
        return ""
    }

    word = word.trim().toLowerCase()
    for (let s in substitution) {
        // word = word.replace(new RegExp(s, "g"), substitution[s])
        word = word.replace(s, substitution[s])
    }

    const value = []
    const length = word.length

    for (let i = 0; i < length; i++) {
        let l = word.substr(i, 1)
        value[i] = ""

        if (i === 0 && length > 1 && word[i] + word[i + 1] === "cr") {
            value[i] = 4
        }

        for (let code in exceptions_leading) {
            if (exceptions_leading[code].includes(word[i] + word[i + 1])) {
                value[i] = parseInt(code)
            }
        }

        if (i !== 0 && exceptions_following.includes(word[i - 1] + word[i])) {
            value[i] = 8
        }

        if (value[i] == "") {
            for (let code in coding_table) {
                if (coding_table[code].indexOf(l) !== -1) {
                    value[i] = parseInt(code)
                    break
                }
            }
        }
    }

    for (let i = 1; i < length; i++) {
        if (value[i] == value[i - 1]) {
            value[i] = ""
        }
        if (value[i] == 0) {
            value[i] = ""
        }
    }

    return value.join("") + ""
}
