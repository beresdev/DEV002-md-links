const {pathValidation, isDir, readDirectory, ismdFile, getLinks, linksToObjects } = require('./main.js')

let path = pathValidation('./md_files');

// function mdLinks(path) {

// }

isDir(path);

readDirectory(path);

ismdFile(path);

getLinks(path)
    .then(data => linksToObjects(data,path))
    .catch(error => console.log(error));