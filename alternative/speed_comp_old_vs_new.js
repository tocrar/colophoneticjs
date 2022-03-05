import v1 from "./index_old.mjs"
import v2 from "../mjs/index.js"

const word =
    "car chair moon schon scheitern china kobold crane frame klagen drei blau grün Gräser Süßigkeiten "

console.time("Old:")
for (let index = 0; index < 1000; index++) {
    v1(word)
}
console.timeEnd("Old:")

console.time("New:")
for (let index = 0; index < 1000; index++) {
    v2(word)
}
console.timeEnd("New:")
