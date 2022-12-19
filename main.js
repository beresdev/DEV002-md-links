const fs = require('fs');
const resolve  = require('path');
let path = require('node:path');
const process = require('process');
const axios = require('axios').default;

function pathValidation(enteredPath) {
    if(path.isAbsolute(enteredPath))
    {   
        console.log("La ruta ingresada es absoluta: " + enteredPath)
        return enteredPath;
    } else {
        console.log("La ruta ingresada es relativa: " + enteredPath)
        let resolvedPath = path.resolve(process.cwd(),enteredPath);
        console.log("Ruta resuelta: " + resolvedPath);
        return resolvedPath;
    }
}

function isDir(enteredPath) {
    try {
        const stats = fs.statSync(enteredPath);
        return stats.isDirectory();
      } catch (err) {
        console.error(err);
      }
}

function readDirectory (enteredPath) {
    let files = fs.readdirSync(enteredPath, ['utf-8', true]);
    console.log(files)
}

function ismdFile(enteredPath) {
    if(path.extname(enteredPath) === ".md")
    {
        console.log("Es un archivo Markdown")
    } else {
        console.log("Es un archivo no válido")
    }
}

function getLinks(enteredPath) {
    const regexLinks = /\[(.+?)\]\((https?:\/\/[^\s]+)(?: "(.+)")?\)|(https?:\/\/[^\s]+)/ig;
    
    return new Promise((res, rej) => {
        fs.readFile(enteredPath, 'utf8', (error, data) =>
        {
            if(error) return rej(error);
            console.log(data.match(regexLinks));
            return res(data.match(regexLinks));
        });
    });
}

function linksToObjects(data, path) {
    const urlRegex = /\((https?:\/\/[^\s]+)(?: "(.+)")?\)|(https?:\/\/[^\s]+)/ig;
    const textRegex = /\[(\w+.+?)\]/gi;
    let arrayO =[];
    let n = data.length;

    data.forEach(element => {
        let extractedURL = element.match(urlRegex).toString();
        let linkURL = extractedURL.slice(1,-1);
        let extractedText = element.match(textRegex).toString();
        let linkText = extractedText.slice(1,-1);

        arrayO.push({href: linkURL, text: linkText, file: path})
    });
    console.log("Los links contienen la siguiente información: ");
    // console.log(arrayO);
    return arrayO;
}

// function httpRequest(data) {
//     let arrayO =[];

//     data.forEach(element => {
//         let status;
//         let ok;

//         axios({
//             method: 'get',
//             url:`${element.href}`,
//             responseType: 'stream'
//           })
//         .then(function(response) {
//             status = response.status;
//             ok = response.statusText;
//             arrayO.push({status: status, ok: ok})
//             console.log(arrayO);
//             return arrayO;
//         })
//         // .catch(function(error) {
//         //     if(error.response) {
//         //         status = error.response.status;
//         //         ok = 'fail';
//         //         arrayO.push({status: status, ok: ok})
//         //         return arrayO;
//         //     }
//         //})

//     });
// }

function httpRequest(data) {
    let promises = [];
    data.forEach(element => {

        let axiosPromise = axios({
            method: 'get',
            url:`${element.href}`,
            responseType: 'stream'
          })
          .then(response => {
            element.status = response.status;
            element.ok = response.statusText;
            return element;
          })
          .catch(error => {
            element.status = error?.response?.status;
            element.ok = 'FAIL';
            return element;
          });
          promises.push(axiosPromise);
    })
    return Promise.all(promises);
}



module.exports = {pathValidation, isDir, readDirectory, ismdFile, getLinks, linksToObjects, httpRequest}
