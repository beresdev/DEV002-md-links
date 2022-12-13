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

// function isDir(enteredPath) {

// }

function getLinks(enteredPath) {
    const regexLinks = /!*\[(.+?)\]\((.+?)\)/gi;
    return new Promise((resolve, reject) => {
        fs.readFile(enteredPath, 'utf8', (error, data) =>
        {
            if(error) return reject(error);
            return resolve(data.match(regexLinks));
        });
    });
}

function linksToObjects(data, path) {
    const textRegex = /\[(\w+.+?)\]/gi;
    const urlRegex = /\((\w+.+?)\)/gi;
    let arrayO =[];
    let n = data.length;

    data.forEach(element => {
        let linkURL = element.match(urlRegex);
        let linkText = element.match(textRegex);

        arrayO.push({href: linkURL, text: linkText, file: path})
    });
    console.log(arrayO);
}

module.exports = {pathValidation, getLinks, linksToObjects}