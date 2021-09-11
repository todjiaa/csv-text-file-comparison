import { createElement } from "./createElement.js";
import { missingInvoicesWrapper } from "../main.js";

// Write the missing invoices found in the csv file into the DOM. Create a table and import all the elements of the array in single cell. Create a header name of the table with the count of the missing invoices found. Check if any missing invoices and if not create an element notifing for it. 
export const writeMissingInvoices = (usableMissingRows) => {
    if (usableMissingRows.length === 0) {
        createElement(
            "h2",
            missingInvoicesWrapper,
            "table-header",
            "No Missing Invoices in CSV File"
        )
    }
    else {
        createElement(
            "h2",
            missingInvoicesWrapper,
            "table-header",
            `Missing Invoices in CSV File: ${usableMissingRows.length}`
        )
    }

    const [tableCsv] = createElement(
        "table",
        missingInvoicesWrapper, 
        "table-csv", 
    );

    usableMissingRows.forEach(row => {
        const [tr] = createElement("tr", tableCsv);

        row.forEach(cell => {
            // if (cell === " " || cell === "") return;
            createElement("td", tr, "td-csv", cell);
        })
    })
}