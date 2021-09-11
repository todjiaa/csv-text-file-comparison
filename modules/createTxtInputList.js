import { createElement } from "./createElement.js";
import { txtUl, sessionStatus } from "../main.js";

// Create a list with the names of the loaded txt files
export const createTxtInputList = (txtFilesName) => {
    if (!sessionStatus.completed) {
        createElement(
            "li",
            txtUl,
            "txt-li",
            txtFilesName
        );
        txtUl.parentElement.classList.add("txt-csv-border");
    }
}