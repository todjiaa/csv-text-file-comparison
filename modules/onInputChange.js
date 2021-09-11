import { showNotification } from "./showHideNotification.js";
import { sessionStatus, txtFileInput, csvFileInput } from "../main.js";

import { readTxtFile } from "./readTxtFile.js";
import { readCsvFile } from "./readCsvFile.js";

// Txt input change event listener
export const onTxtInputChange = (e) => {
    // Show notification requiring the session to be reset if the user tryes to load a new txt file after the complition of the current session 
    if (sessionStatus.completed) {
        showNotification("Please reset the current session before you continue");
    }

    // Check if any file is choosen then call the read function, else if canceled button is pressed don't do anything
    if (txtFileInput.value.length !== 0) {
        readTxtFile();
    }
}

// Csv input change event listener 
export const onCsvInputChange = (e) => {
    // Show notification requiring the session to be reset if the user tryes to load a new csv file after the complition of the current session 
    if (sessionStatus.completed) {
        showNotification("Please reset the current session before you continue");
    }

    // Check if any file is choosen then call the read function, else if canceled button is pressed don't do anything
    if (csvFileInput.value.length !== 0) {
        readCsvFile();
    }
}
