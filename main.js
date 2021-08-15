const pokupki = "./pokupki.txt";
const vatSales = "./vatSales.csv";

const airTravel = "./airtravel.csv";
const airTravel1 = "./airtravel1.csv";

const initialFilesArray = [pokupki, vatSales];

const loadedFilesArray = [];

const convertTextFilesToObjects = (text) => {
    const lines = text.split("\n");

    let result = [];

    let headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {

        if (!lines[i]) continue;

        let obj = {};
        let currentLine = lines[i].split(",");

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentLine[j];
        }
        result.push(obj);
    }
    return [
        result
    ]
}

const compare = () => {
    console.log(loadedFilesArray)

    loadedFilesArray.forEach((array, i) => {
        
        console.log(array)
    })
}

const fetchTextFiles = (file) => {
    fetch(file)
    .then(response => {
        return response
    })
    .then(data => {
        return data.text();

    })
    .then(text => {
        const [textObject] = convertTextFilesToObjects(text);

        loadedFilesArray.push(textObject);

        // console.log(textObject)
    })
}

const fetchFiles = (files) => {
    if (typeof files === "object") {
        files.forEach(file => {
            fetchTextFiles(file);
        })
    }
    else {
        fetchTextFiles(files);
    }
}

document.querySelector("#read-button").addEventListener("click", () => {
    fetchFiles(initialFilesArray);
})

document.querySelector("#compare-button").addEventListener("click", () => {
    compare();
})