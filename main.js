const fs = require('fs');
const resolve  = require('path');
let path = require('node:path');
const process = require('process')

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

// function readFile(enteredPath) {
//     return new Promise((resolve, reject) => {
//         fs.readFile(enteredPath, 'utf8', (error, data) =>
//         {
//             if(error) return reject(error);
//             return resolve(data);
//         });
//     });
// }

function getLinks(enteredPath) {
    const regexLinks = /!*\[(.+?)\]\((.+?)\)/gi;
    return new Promise((resolve, reject) => {
        fs.readFile(enteredPath, 'utf8', (error, data) =>
        {
            if(error) return reject(error);
            return resolve(console.log(data.match(regexLinks)));
        });
    });
}

module.exports = {pathValidation, getLinks}