// Remove any rows in the csv array that are empty or having headers information, etc. 
export const extractOnlyUsableMissingRows = (missingRows) => {
    let usableRows = [];

    for (let i = 0; i < missingRows.length; i++) {
        const missingRowsString = missingRows[i].join('///').replace(/['"]+/g, '');
        
        if (!missingRowsString.startsWith("BG")) continue;

        usableRows.push(missingRowsString.split("///"));
    }
    return [usableRows];
}