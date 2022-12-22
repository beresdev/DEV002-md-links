const {pathValidation, isDir, ismdFile, getLinks, linksToObjects, httpRequest, readDirectory, showObjectsArray} = require('./main.js')
const path = require('node:path');

let epath = pathValidation('./md_files/');

let validate = true;

let files;

//linksAnalisis(epath)
console.log("!!!!!!START!!!!!!")

directoryFilesValidation(epath);

console.log("!!!!!!FINISH!!!!!!")

function directoryFilesValidation(path) {
    console.log("##########enter directoryFilesValidation##########")
    if (isDir(path) === true)  {
        files = readDirectory(path)
        readingDirectoryFiles(files,path);
    } else if(ismdFile(path) === true) {
        linksAnalisis(path)
    } else {
        console.log("ruta inválida")
    }
    console.log("##########exit directoryFilesValidation##########")
}

function readingDirectoryFiles(array, epath) {
    console.log("##########entering readingDirectoryFiles##########")
    array.forEach(element => {
        let newPath = path.join(epath,element);
        directoryFilesValidation(newPath);
    });
    console.log("##########exiting readingDirectoryFiles##########")
}

function linksAnalisis (path) {
    if (validate == false) {
        return getLinks(path)
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