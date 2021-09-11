// Convert the csv files from strings to arrays
export const convertCsvFilesToArray = (csv) => {
    return [
        csv.split("\n")
        .map(row => row.split(";"))
    ];
}