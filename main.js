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

function ismdFile(enteredPath) {
    if(path.extname(enteredPath) === ".md")
    {
        console.log("Es un archivo Markdown")
    } else {
        console.log("Es un archivo no válido")
    }
}

function getLinks(enteredPath) {
    const regexLinks = /\[(.+)\]\((https?:\/\/[^\s]+)(?: "(.+)")?\)|(https?:\/\/[^\s]+)/ig;
    return new Promise((res, rej) => {
        fs.readFile(enteredPath, 'utf8', (error, data) =>
        {
            if(error) return rej(error);
            return res(data.match(regexLinks));
        });
    });
}

function linksToObjects(data, path) {
    const urlRegex = /\((\w+.+?)\)/gi;
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
    console.log(arrayO);
}

module.exports = {pathValidation, ismdFile, getLinks, linksToObjects}
