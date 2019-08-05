const arr = require("./lib/benchmarks/log/raw.json").treeSizeArray
const arrAsc = arr.sort((a, b) => {
    return a - b
})

console.log([
    arrAsc[0],
    arrAsc[Math.round(arr.length * 0.15)],
    arrAsc[Math.round(arr.length * 0.35)],
    arrAsc[Math.round(arr.length * 0.65)],
    arrAsc[Math.round(arr.length * 0.85)],
    arrAsc[arrAsc.length - 1],
    arrAsc[Math.round(arr.length * 0.849)]
])
