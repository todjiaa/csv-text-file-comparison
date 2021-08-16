const textReader = new FileReader();
const csvReader = new FileReader();

const noEmptyStrings = (value) => {
    if (typeof(value) !== "") {
        return value;
    }
}

const onlyStrings = (value) => {
    if (typeof(value) === "string" && typeof(value) !== "?" ) {
        return value;
    }
}

const convertTextFilesToObjects = (text) => {
    const lines = text.split("\n");

    let result = [];

    let headers = lines[0].split(",");

    for (let i = 0; i < lines.length; i++) {
        if (!lines[i]) continue;

        let obj = {};
        let currentLine = lines[i].split(",");

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentLine[j];
        }
        result.push(obj);
    }
    return [
        result
    ]
}


const extractIdFromTextFile = (file) => {
    const idFromTextFile = file.map(eachLine => {
        return Object.values(eachLine).map(el => {

            const filtered = el.split(" ").filter(noEmptyStrings);

            const idArray = Array.from(filtered[3])

            console.log(idArray)

            return idArray;
        })
    })
    return [idFromTextFile];
}

const extractIdFromCsvFile = (file) => {
    const idFromCsvFile = file.map(line => {
        const array = Object.values(line).filter(onlyStrings)
        .map(el => {
            return el.replace(/[^a-zA-Z, ^0-9, ^;]/g, "");
        })
        .map(line => {
            const filtered = line.split(" ").filter(noEmptyStrings)
            
            console.log(filtered)

            // Can not get the id here!!!

            return filtered;

        })
    })
    return [idFromCsvFile];
}

const getTextFile = () => {
    const textFile = document.querySelector(".text-input").files[0];

    if (textFile) {
        textReader.addEventListener("load", (e) => {
            const text = e.target.result;

            const [textObject] = convertTextFilesToObjects(text);
        
            console.log("text file read")
            
            extractIdFromTextFile(textObject);
        })
        textReader.readAsText(textFile)
    }
}

const getCsvFile = () => {
    const csvFile = document.querySelector(".csv-input").files[0];

    if (csvFile) {
        csvReader.addEventListener("load", (e) => {
            const csv = e.target.result;

            const [csvObject] = convertTextFilesToObjects(csv);

            console.log("csv file read")

            extractIdFromCsvFile(csvObject);
        })
        csvReader.readAsText(csvFile)
    }
}


document.querySelector(".get-text-button").addEventListener("click", getTextFile);

document.querySelector(".get-csv-button").addEventListener("click", getCsvFile);


// document.querySelector("#compare-button").addEventListener("click", () => {
//     compare();
// });