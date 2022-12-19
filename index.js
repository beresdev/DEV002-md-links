const axios = require('axios').default;

const {pathValidation, isDir, ismdFile, getLinks, linksToObjects, httpRequest, readDirectory} = require('./main.js')

let path = pathValidation('./md_files/file_2.md');

let validate = true;

let validateDir = isDir(path);

if (validateDir === true)  {
        console.log("leyendo directorio ...")
        readDirectory(path)
}

// dir(path, validateDir);


// function dir (path, validateDir) {
//     if (validateDir == true)  {
//         console.log("leyendo directorio ...")
//         readDirectory(path)
//     }
//     console.log("dir no leido")
// }

ismdFile(path);


if (validate == false) {
    getLinks(path)
        .then(data => linksToObjects(data,path))
        .catch(error => console.log(error));
} else {
    getLinks(path)
        .then(data => linksToObjects(data,path))
        .then(data => httpRequest(data))
        .then(data => console.log(data))
        .catch(error => console.log(error));
}

