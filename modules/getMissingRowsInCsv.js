import { csvFileIdCellNumber, txtFileIdCellNumber } from "./variablesAndFlags.js";

// Compare both csv and txt arrays and return those that are missing in the csv array 
export const getMissingRowsInCsv = (csvArray, textArray) => {
    const commonLines = [];

    csvArray.forEach(csvRow => {
        textArray.forEach(textRow => {
            if (csvRow[csvFileIdCellNumber-1] === textRow[txtFileIdCellNumber-1]) {
                commonLines.push(csvRow);
            }
        })
    })
    return [csvArray.filter(item => !commonLines.includes(item))];
}