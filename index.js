const {pathValidation, ismdFile, getLinks, linksToObjects } = require('./main.js')

let path = pathValidation('md_files/file_2.md');

ismdFile(path);

getLinks(path)
    .then(data => linksToObjects(data,path))
    .catch(error => console.log(error));