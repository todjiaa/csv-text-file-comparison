import { getMissingRowsInCsv } from "./modules/getMissingRowsInCsv.js";
import { extractOnlyUsableMissingRows } from "./modules/extractOnlyUsableMissingRows.js";
import { writeMissingInvoices } from "./modules/writeMissingInvoices.js";
import { hideNotification } from "./modules/showHideNotification.js";
import { onTxtInputChange, onCsvInputChange } from "./modules/onInputChange.js";
import { resetSession } from "./modules/resetSession.js";
import { loadingGifWrapper, txtFileInput, csvFileInput, sessionStatus, txtUl, csvUl, files } from "./modules/variablesAndFlags.js";

// Init the whole algorithm of comparing both csv and txt files
const findMissingInvoicesInCsvFile = () => {
    if (!sessionStatus.completed && txtUl.childElementCount !== 0 && csvUl.childElementCount !== 0) {
        loadingGifWrapper.classList.add("show-block");

        const txtArray = [].concat.apply([], files.txtFilesArray);
        const csvArray = [].concat.apply([], files.csvFilesArray);

        const [missingRows] = getMissingRowsInCsv(csvArray, txtArray);

        const [usableMissingRows] = extractOnlyUsableMissingRows(missingRows);

        writeMissingInvoices(usableMissingRows);

        loadingGifWrapper.classList.remove("show-block");

        sessionStatus.completed = true;
    }
}

// On change event listener on the txt and csv inputs
txtFileInput.addEventListener("change", onTxtInputChange);
csvFileInput.addEventListener("change", onCsvInputChange);

// Click event on the "find missing" button that triggers the main function initializing everything 
document.querySelector(".find-missing-button").addEventListener("click", () => {
    findMissingInvoicesInCsvFile();
});

// Click event on the "resetSession" button that triggers the resetSession session function
document.querySelector(".reset-button").addEventListener("click", () => {
    resetSession();
});

// Click event on the "X" span of the notification that triggers the function closing the resetSession notification 
document.querySelector(".close-notification-wrapper").addEventListener("click", hideNotification);