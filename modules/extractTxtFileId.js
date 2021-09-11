import { txtFileIdCellNumber } from "../main.js";

// Remove the automatically generated entry number at the beginning of each txt id which comes from the software that has exported the orifinal txt file
export const extractTxtFileId = (txtArray) => {
    txtArray.forEach((row, i) => {
        if (!row[txtFileIdCellNumber-1]) return;

        const entryNumber = i + 1 + "01";

        row[txtFileIdCellNumber-1] = row[txtFileIdCellNumber-1].substring(entryNumber.length);
    })
}