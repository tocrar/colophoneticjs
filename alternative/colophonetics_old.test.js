import colophonetics from "./index_old.mjs"

test("handle empty string", () => {
    expect(colophonetics("")).toBe("")
})

test("handle spaces", () => {
    expect(colophonetics("    ")).toBe("")
})

const singleLetter = [
    ["a", 0],
    ["b", 1],
    ["c", 8],
    ["d", 2],
    ["e", 0],
    ["f", 3],
    ["g", 4],
    ["h", ""],
    ["i", 0],
    ["j", 0],
    ["k", 4],
    ["l", 5],
    ["m", 6],
    ["n", 6],
    ["o", 0],
    ["p", 1],
    ["q", 4],
    ["r", 7],
    ["s", 8],
    ["t", 2],
    ["u", 0],
    ["v", 3],
    ["w", 3],
    ["x", 48],
    ["y", 0],
    ["z", 8],
]

test.each(singleLetter)(
    "single letter %s should return %s",
    (letter, value) => {
        expect(colophonetics(letter)).toBe(value.toString())
    }
)

const combinations = [
    ["ca", 4],
    ["ch", 4],
    ["ck", 4],
    ["cl", 45],
    ["co", 4],
    ["cq", 4],
    ["cu", 4],
    ["cx", 48],
    ["cr", 47],
    ["cx", 48],
    ["dc", 8],
    ["ds", 8],
    ["dz", 8],
    ["kx", 48],
    ["ph", 3],
    ["qx", 48],
    ["sc", 8],
    ["sch", 8],
    ["tc", 8],
    ["ts", 8],
    ["tz", 8],
    ["zc", 8],
    ["aa", 0],
]

test.each(combinations)("combination %s should return %s", (letter, value) => {
    expect(colophonetics(letter)).toBe(value.toString())
})

const specialCases = [
    ["crane", "476"],
    ["claim", "456"],
    ["canon", "466"],
    ["chore", "47"],
    ["schein", "86"],
    ["phone", "36"],
    ["china", "46"],
    ["hase", "08"],
]

test.each(specialCases)("special word %s should return %s", (letter, value) => {
    expect(colophonetics(letter)).toBe(value)
})

test("Upper case letters", () => {
    expect(colophonetics("COFFEE")).toBe("43")
})

test("Long word: 'Kreisschifffahrtsgesellschaft'", () => {
    expect(colophonetics("Kreisschifffahrtsgesellschaft")).toBe("478378485832")
})

const sentences = [
    [
        "Der Hase war nicht schnell genug um den Igel einzuholen",
        "27 08 37 642 865 464 06 26 045 06856",
    ],
    [
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr",
        "576 0186 257 82 062 468227 821864 0527",
    ],
    [
        "At vero eos et accusam et justo duo dolores et ea rebum.",
        "02 37 08 02 08486 02 082 2 2578 02 0 716",
    ],
    [
        "Scheinbar ist dieser Text nicht in chinesisch verfasst",
        "8617 082 287 2482 642 06 4688 37382",
    ],
]

test.each(sentences)("Sentence", (sentence, value) => {
    expect(colophonetics(sentence)).toBe(value)
})

test("special", () => {
    expect(colophonetics([21, 3232])).toBe(" ")
})
