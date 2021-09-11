import { getMissingRowsInCsv } from "./modules/getMissingRowsInCsv.js";
import { extractOnlyUsableMissingRows } from "./modules/extractOnlyUsableMissingRows.js";
import { writeMissingInvoices } from "./modules/writeMissingInvoices.js";
import { hideNotification } from "./modules/showHideNotification.js";
import { onTxtInputChange, onCsvInputChange } from "./modules/onInputChange.js";
import { resetSession } from "./modules/resetSession.js";

export const txtFileIdCellNumber = 4;
export const csvFileIdCellNumber = 5;

export const txtFileInput = document.querySelector(".txt-input");
export const csvFileInput = document.querySelector(".csv-input");

export const fileNames = {
    txtFileNames: [],
    csvFileNames: []
}

export const files = {
    txtFilesArray: [],
    csvFilesArray: []
}

export const txtUl = document.querySelector(".txt-ul");
export const csvUl = document.querySelector(".csv-ul");

export let sessionStatus = {
    completed: false
};

export const missingInvoicesWrapper = document.querySelector(".missing-invoices-wrapper"); 

export const notificationWrapper = document.querySelector(".notification-wrapper");

const loadingGifWrapper = document.querySelector(".loading-gif-wrapper");

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