import colophonetics from "../index.mjs"

test("handle empty string", () => {
    expect(colophonetics("")).toBe("")
})

test("handle spaces", () => {
    expect(colophonetics("    ")).toBe("")
})

const singleLetter = [
    ["h", ""],
    ["a", 0],
    ["e", 0],
    ["i", 0],
    ["j", 0],
    ["o", 0],
    ["u", 0],
    ["y", 0],
    ["b", 1],
    ["p", 1],
    ["d", 2],
    ["t", 2],
    ["f", 3],
    ["v", 3],
    ["w", 3],
    ["g", 4],
    ["k", 4],
    ["g", 4],
    ["x", 48],
    ["l", 5],
    ["m", 6],
    ["n", 6],
    ["r", 7],
    ["c", 8],
    ["s", 8],
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
    ["dc", 8],
    ["ds", 8],
    ["dz", 8],
    ["tc", 8],
    ["ts", 8],
    ["tz", 8],
    ["sc", 8],
    ["sch", 8],
    ["zc", 8],
    ["cx", 48],
    ["kx", 48],
    ["qx", 48],
]

test.each(combinations)("combination %s should return %s", (letter, value) => {
    expect(colophonetics(letter)).toBe(value.toString())
})

test("Long word: 'Kreisschifffahrtsgesellschaft'", () => {
    expect(colophonetics("Kreisschifffahrtsgesellschaft")).toBe("478378485832")
})
