const {pathValidation, isDir, ismdFile, getLinks, linksToObjects, httpRequest, readDirectory, showObjectsArray} = require('./main.js')
const path = require('node:path');

let epath = pathValidation('./md_files/mdfiles2/');

let validate = true;

let files;

console.log("!!!!!!START!!!!!!")

let promises = [];
let promisesD = [];

promisesD.push(directoryFilesValidation(epath).then(() => console.log("!!!!!!FINISH!!!!!!")))
Promise.all(promisesD).then(() => console.log("_______________________")) 


function directoryFilesValidation(epath) {
    if (isDir(epath) === true)  {
        files = readDirectory(epath)
        files.forEach(element => {
            let newPath = path.join(epath,element);
            let base = path.basename(epath);
            directoryFilesValidation(newPath).then(() => console.log("FINISH " + base + " DIRECTORY"));
        })
    } else if(ismdFile(epath) === true) {
        promises.push(linksAnalisis(epath))
    } else {
        console.log("ruta inválida")
    }
    return Promise.all(promises)
}

function linksAnalisis (path) {
    if (validate == false) {
        getLinks(path)
            .then(data => linksToObjects(data,path))
            .then(data =>  showObjectsArray(data, path))
            .catch(error => console.log(error));
    } else {
        return getLinks(path)
                .then(data => linksToObjects(data,path))
                .then(data => httpRequest(data))
                .then(data =>  showObjectsArray(data, path))
                .catch(error => console.log(error));
    }
}