const fs = require('fs');
const resolve  = require('path');
const path = require('node:path');
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
    const stats =fs.statSync(enteredPath);
    let res = stats.isDirectory();
    let base = path.basename(enteredPath);

    if (res === true) {
        console.log(base + " es un directorio")
        return true;
    } else {
        return false
    }
}

function readDirectory (enteredPath) {
    let files = fs.readdirSync(enteredPath, ['utf-8', true]);
    let base = path.basename(enteredPath);
    console.log(base + " contiene: ")
    console.log(files)
    return files;
}

function ismdFile(enteredPath) {
    let base = path.basename(enteredPath);
    if(path.extname(enteredPath) === ".md")
    {
        console.log(base + " es un archivo Markdown")
        return true;
    } else {
        console.log("Es un archivo no válido")
        return false;
    }
}

function getLinks(enteredPath) {
    const regexLinks = /\[(.+?)\]\((https?:\/\/[^\s]+)(?: "(.+)")?\)|(https?:\/\/[^\s]+)/ig;
    return new Promise((res, rej) => {
        fs.readFile(enteredPath, 'utf8', (error, data) =>
        {
            if(error) {
                console.log("Error: ", error)
                return rej(error);
            } else {
                return res(data.match(regexLinks));
            }
        });
    });
}

function linksToObjects(data, enteredPath) {
    const urlRegex = /\((https?:\/\/[^\s]+)(?: "(.+)")?\)|(https?:\/\/[^\s]+)/ig;
    const textRegex = /\[(\w+.+?)\]/gi;
    let arrayO =[];
    let base = path.basename(enteredPath);

    if(data === null || data === undefined) {
        console.log("No se encontraron links en " + base)
        return null;
    } else {
        data.forEach(element => {
            let extractedURL = element.match(urlRegex).toString();
            let linkURL = extractedURL.slice(1,-1);
            let extractedText = element.match(textRegex).toString();
            let linkText = extractedText.slice(1,-1);
            arrayO.push({href: linkURL, text: linkText, file: enteredPath})
        });
        return arrayO;
    }
}

function httpRequest(data) {
    let promises = [];

    if (data === null || data === undefined) {
        console.log("sin urls para consultar")
        return null
    } else {
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
}

function showObjectsArray(data, enteredPath) {
    let base = path.basename(enteredPath);
    console.log("Los links de " + base + " contienen la siguiente información: ")
    console.log(data)
}

module.exports = {pathValidation, isDir, readDirectory, ismdFile, getLinks, linksToObjects, httpRequest, showObjectsArray}
