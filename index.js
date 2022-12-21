const {pathValidation, isDir, ismdFile, getLinks, linksToObjects, httpRequest, readDirectory} = require('./main.js')
const path = require('node:path');

let epath = pathValidation('./md_files/');

let validate = true;

// let validateDir = isDir(path);

let files;

directoryFilesValidation(epath);

function directoryFilesValidation(path) {
    if (isDir(path) === true)  {
        console.log("leyendo directorio ...")
        files = readDirectory(path)
        readingDirectoryFiles(files,path);
    } else if(ismdFile(path) === true) {
        linksAnalisis(path)
    } else {
        console.log("ruta inválida")
    }
}

function readingDirectoryFiles(array, epath) {
array.forEach(element => {
    //console.log(element)
    let newPath = path.join(epath,element);
    //console.log(newPath)
    directoryFilesValidation(newPath);
});
}

//readingDirectoryFiles(files,path);


//ismdFile(path);

//linksAnalisis(path);

function linksAnalisis (path) {
    if (validate == false) {
        getLinks(path)
            .then(data => linksToObjects(data,path))
            .then(data => console.log(data))
            .catch(error => console.log(error));
    } else {
        getLinks(path)
            .then(data => linksToObjects(data,path))
            .then(data => httpRequest(data))
            .then(data => console.log(data))
            .catch(error => console.log(error));
    }
}