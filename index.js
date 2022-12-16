const axios = require('axios').default;

const {pathValidation, isDir, ismdFile, getLinks, linksToObjects } = require('./main.js')

let path = pathValidation('./md_files/file_1.md');




// function mdLinks(path) {

// }

isDir(path);
// , readDirectory,
// readDirectory(path);

ismdFile(path);

axios({
    method: 'get',
    url: 'https://es.wikipedia.org/wiki/Markdown',
    responseType: 'stream'
  })
 .then(function (response) {
      console.log(response.status)
      console.log(response.statusText)
});


getLinks(path)
    .then(data => linksToObjects(data,path))
    .catch(error => console.log(error));
