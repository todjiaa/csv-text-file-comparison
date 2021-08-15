const pokupki = "./pokupki.txt";
const airtravel = "./airtravel.csv";

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
        console.log(textObject)
    })
}
document.querySelector("#read-button").addEventListener("click", () => {
    fetchTextFiles(pokupki)
})

