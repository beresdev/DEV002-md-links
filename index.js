const axios = require('axios').default;

const {pathValidation, isDir, ismdFile, getLinks, linksToObjects, httpRequest2 } = require('./main.js')

let path = pathValidation('./md_files/file_1.md');

let validate = true;


isDir(path);
// , readDirectory,
// readDirectory(path);

ismdFile(path);


if (validate == false) {
    getLinks(path)
        .then(data => linksToObjects(data,path))
        .catch(error => console.log(error));
} else {
    getLinks(path)
        .then(data => linksToObjects(data,path))
        .then(data => httpRequest2(data))
        .then(data => console.log(data))
        .catch(error => console.log(error));
}

