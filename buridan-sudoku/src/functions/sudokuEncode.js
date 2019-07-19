// Unreserved URL chars, as declared by section 2.3 of RFC 3986 
// (see https://www.ietf.org/rfc/rfc3986.txt for more). All used except the 
// period, which is used to denote each line of the encoded sudoku. Lines 
// encoded separately to avoid reaching integer limit of javascript, and thus 
// not being able to encode or decode the puzzle correctly due to integer 
// accuracy at larger values such as would be produced by turning an entire 
// sudoku into one long number.
const base65Dict = "0123456789" +
    "abcdefghijklmnopqrstuvwxyz" + 
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + 
    "-_~"

// Calls to encode or decode are NOT checked to verify if they are in the format
// of a sudoku. These checks should be made by the client if required, and are 
// not included here because sudokus can be in different formats, and an invalid
// sudoku does not prevent the encoding/decoding functions from working.
const encode = (solutionString = "", puzzleString = "") => {
    // Preventing error being thrown in the event that no args are passed (for
    // example if a hook calls this method on an empty global context)
    if (solutionString === "" || puzzleString === "") {
        return
    }
    const solutionRows = toRows(solutionString)
    const puzzleRows = toRows(puzzleString)
    // Find where clues are by index in each row
    const clueLocations = puzzleRows.map(row => {
        return row.split("").reduce((acc, cur, index) => {
            // Note that acc is a string, hence acc + (index + 1) does not add
            // the values together, but concatenates them instead. Index + 1 
            // must be added to avoid adding index = 0, which results in no
            // change to the acc value.
            return cur === "0" ? acc : acc + (index + 1)         
        }, "")
    })
    // Encode the solution and clue positions, with rows separated by a period
    return clueLocations.map((value, index) => {
        // Encoded solution and encoded clue positions may be concatenated, 
        // since the highest and lowest values a row in sudoku may take in
        // sudoku (987654321, and 123456789 respectively) both encode to a 5
        // char 65-bit value, so may be decoded by spliting at the 5th char
        return [encodeBase65(solutionRows[index]) + encodeBase65(value)]
    }).reduce((acc, cur) => {
        return acc + "." + cur
    })
}

const decode = (encoded = "") => {
    // Default arg preventing error being thrown in the event that no args are 
    // passed (for example if a hook calls this method on an empty global 
    // context) decode will return "0" in this case
    // Split into rows and clue positions, as indicated by periods and 5th char,
    // and return the decoded values
    const decoded = encoded.split(".").map(encoded => {
        return [encoded.slice(0,5), encoded.slice(5)].map(val => {
            return decodeBase65(val)
        })
    })
    // Concatenate rows into a solutionString
    const solutionString = decoded.reduce((acc, cur) => {
        return acc + cur[0]
    }, [])
    // Replace 0s in the puzzle string, and replace clue indexes with the
    // correct clue values from decoded rows
    const puzzleString = decoded.reduce((acc, cur) => {
        return acc + cur[0].toString().split("").map((value, index) => {
            return cur[1].toString().split("").includes(
                (index + 1).toString()) ? value : 0
        }).join("")
    }, [])
    return [solutionString, puzzleString]
}

const encodeBase65 = (decimal, base65 = "", exponent = null) => {
    // Returns false when decimal goes to 0
    if (!decimal) {
        return base65
    } if (exponent == null) {
        // Finding largest exponent required for encoding/decoding
        return encodeBase65 (decimal, base65, floorLogBase(decimal))
    } else {
        const power = 65 ** exponent
        const exponentCoefficient = Math.floor(
            decimal / power
        )
        // Recursively encode/decode, by reducing/increasing the decimal, and 
        // encoded values where appropriate, reducing the exponent each time
        return encodeBase65 (
            decimal - (exponentCoefficient * power),
            base65 + base65Dict[exponentCoefficient],
            exponent - 1
        )
    }
}

const decodeBase65 = (base65, decimal = 0, exponent = null) => {
    if (base65 === "") {
        return decimal
    } if (exponent == null) {
        // Finding largest exponent required for encoding/decoding
        return decodeBase65 (base65, decimal, base65.length - 1)
    } else {
        const power = 65 ** exponent
        const exponentCoefficient = base65Dict.indexOf(base65[0])
        // Recursively encode/decode, by reducing/increasing the decimal, and 
        // encoded values where appropriate, reducing the exponent each time
        return decodeBase65 (
            base65.slice(1),
            decimal + (exponentCoefficient * power),
            exponent - 1
        )
    }
}

// Convert a sudoku string to an array of its rows. chunkSize defaulted to 9 to
// reflect normal size of sudoku.
const toRows = (string, chunkSize = 9, result = []) => {
    if (string.length === 0) {
        return result
    } else {
        result.push(string.slice(0, chunkSize))
        return toRows(
            string.slice(chunkSize), 
            chunkSize, 
            result        
        )
    }
}

// base value defaulted to 65 given that sudoku is encoded with 65 unreserved
// URL chars
const floorLogBase = (number, base = 65) => {
    return Math.floor(
        Math.log(number) / Math.log(base)
    )
}

// Exports
export {
    encode, 
    decode
}