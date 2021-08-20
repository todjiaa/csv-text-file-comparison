const textFileIdCellNumber = 4;
const csvFileIdCellNumber = 5;

const missingInvoicesWrapper = document.querySelector(".missing-invoices-wrapper");

const textReader = new FileReader();
const csvReader = new FileReader();

let taskAccomplished = false;

const noEmptyStrings = (value) => {
    if (typeof(value) !== "") {
        return value;
    }
}

const removeEntryNumberFromTextFileId = (id) => {
    if (!id) return;

    const idArray = Array.from(id);

    if (idArray[1] === "0" && idArray[2] === "0") {
        return idArray.splice(4).join('');
    }
    
    else if (idArray[2] === "0") {
        return idArray.splice(4).join('');
    }
    
    else if (idArray[1] === "0") {
        return idArray.splice(3).join('');
    }
}

const removeZeroFromBeginnigOfCsvFileId = (id) => {
    return Number(id).toString();
}

const convertTextFilesToArray = (text) => {
    return [text.split("\n").map(line => line.split(" ").filter(noEmptyStrings))];
}

const convertCsvFilesToArray = (text) => {
    return [text.split("\n").map(line => line.split(";"))];
}


const readTextFile = (callback) => {
    const textFile = document.querySelector(".text-input").files[0];

    if (textFile) {
        textReader.addEventListener("load", (e) => {
            const [textArray] = convertTextFilesToArray(e.target.result);

            callback(textArray);
        })
        textReader.readAsText(textFile)
    }
}

const readCsvFile = (callback) => {
    const csvFile = document.querySelector(".csv-input").files[0];

    if (csvFile) {
        csvReader.addEventListener("load", (e) => {
            const [csvArray] = convertCsvFilesToArray(e.target.result);

            callback(csvArray);
        })
        csvReader.readAsText(csvFile)
    }
}

const getCommonLines = (csvArray, textArray) => {
    const commonLines = [];

    csvArray.forEach(csvLine => {
        textArray.forEach(textLine => {
            if (csvLine[csvFileIdCellNumber-1] === textLine[textFileIdCellNumber-1]) {
                commonLines.push(csvLine);
            }
        })
    })
    return [commonLines];
}

const removeCommonLines = (first, second) => {
    const spreaded = [...first, ...second];

    return spreaded.filter(el => {
        return !(first.includes(el) && second.includes(el));
    })
}

const fixTextFileId = (textArray) => {
    textArray.forEach(line => {
        line[textFileIdCellNumber-1] = removeEntryNumberFromTextFileId(line[textFileIdCellNumber-1]);
    })
}

const fixCsvFileId = (csvArray) => {
    csvArray.forEach(line => {
        line[csvFileIdCellNumber-1] = removeZeroFromBeginnigOfCsvFileId(line[csvFileIdCellNumber-1]);
    })
}

const getMissingInvoicesInCsvFile = () => {
    if (!taskAccomplished) {
        readTextFile((textArray) => {
    
            fixTextFileId(textArray);
    
            readCsvFile((csvArray) => {
                fixCsvFileId(csvArray);
    
                const [commonLines] = getCommonLines(csvArray, textArray);
    
                const missingLines = removeCommonLines(csvArray, commonLines);
    
                for (let i = 0; i < missingLines.length; i++) {
                    const missingInvoice = missingLines[i].join('//');
                    
                    if (!missingInvoice.startsWith("BG")) continue;
    
                    const div = document.createElement("div");
                    div.className = "missing-invoices";
                    missingInvoicesWrapper.append(div);
    
                    div.innerHTML = "-" + missingInvoice;
                }
                taskAccomplished = true;
            });
        });
    }
}

document.querySelector(".get-missing-button").addEventListener("click", () => {
    getMissingInvoicesInCsvFile();
});