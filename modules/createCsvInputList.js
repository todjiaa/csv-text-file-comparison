import { createElement } from "./createElement.js";
import { csvUl, sessionStatus } from "../main.js";

// Create a list with the names of the loaded csv files
export const createCsvInputList = (csvFilesName) => {
    if (!sessionStatus.completed) {
        createElement(
            "li",
            csvUl,
            "csv-li",
            csvFilesName
        );
        csvUl.parentElement.classList.add("txt-csv-border");
    }
}