const {pathValidation, isDir, ismdFile, getLinks, linksToObjects, httpRequest, readDirectory} = require('./main.js')

let path = pathValidation('./md_files/');

let validate = true;

let validateDir = isDir(path);

let files;

if (validateDir === true)  {
        console.log("leyendo directorio ...")
        files = readDirectory(path)
} else {
    console.log('No es directorio')
}

function readingDirectoryFiles(array, path) {
array.forEach(element => {
    console.log(path.basename(element.path))
});
}

readingDirectoryFiles(files,path);

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

