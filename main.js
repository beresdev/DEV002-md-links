const fs = require('fs');
const resolve  = require('path');
const path = require('node:path');
const process = require('process');
const { error } = require('console');
const axios = require('axios').default;

let base;

function pathValidation(enteredPath) {
    if(enteredPath === undefined) {
        return undefined
    }
    else if(path.isAbsolute(enteredPath))
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
    const stats = fs.statSync(enteredPath);
    let res = stats.isDirectory();
    base = path.basename(enteredPath);

    if(res == error) {
        console.log("directorio inválido")
        console.error(error);
    }
    else if (res === true) {
        console.log(base + " es un directorio")
        return true;
    } else {
        return false
    }
}

function readDirectory (enteredPath) {
    let files = fs.readdirSync(enteredPath, ['utf-8', true]);
    base = path.basename(enteredPath);
    console.log(base + " contiene: ")
    console.log(files)
    return files;
}

function ismdFile(enteredPath) {
    base = path.basename(enteredPath);
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
    base = path.basename(enteredPath);

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
    base = path.basename(enteredPath);
    if(data === null) {
        return null
    }
    console.log("Los links de " + base + " contienen la siguiente información: ")
    console.log(data)
}

function linksArrays(data) {
    let array = [];
    if(data == null) {
        return array;
    }
    else {
        return data.map(element => element.href)
    }
}

function linkStats(data) {
    let total = data.length;
    let equals = 0;
    let unique = 0;

    for(let i = 0; i<= total-1; i++) {
        if(data[i] === data[i+1]) {
            equals = equals + 1;
        }
    }
    unique = total - equals;

    return {
        Total: total, 
        Unique: unique
    }
}

function arrayOk(data) {
    let array = [];
    let arrays = linksArrays(data);
    let stats = linkStats(arrays);

    if (data == null || data == undefined) {
        return({Total: 0, Unique: 0, Broken: 0})
    }

    data.forEach(element => {
        array.push(element.ok)
    })

    let broken = array.filter(element => element != 'OK').length;

    stats.Broken = broken
    return stats
}

function printStats(object, enteredPath) {
    base = path.basename(enteredPath);
    console.log("_______________________")
    console.log("stats de: " + base)
    console.log("_______________________")
    console.log(object)
}

function linksAnalisis (path, option1, option2) {
    if (option1 === undefined && option2 === undefined) {
        getLinks(path)
            .then(data => linksToObjects(data,path))
            .then(data =>  showObjectsArray(data, path))
            .catch(error => console.log(error));
    } else if(option1 === "--validate" && option2 == undefined){
        return getLinks(path)
                .then(data => linksToObjects(data,path))
                .then(data => httpRequest(data))
                .then(data =>  showObjectsArray(data, path))
                .catch(error => console.log(error));
    } else if(option1 == "--stats" && option2 == undefined) {
        return getLinks(path)
                .then(data => linksToObjects(data,path))
                .then(data => linksArrays(data))
                .then(data => linkStats(data))
                .then(data => printStats(data, path))
    } else if(option1 == "--stats" && option2 == "--validate") {
        return getLinks(path)
                .then(data => linksToObjects(data,path))
                .then(data => httpRequest(data))
                .then(data => arrayOk(data))
                .then(data => printStats(data, path))
    }
}


function directoryFilesValidation(epath, option1, option2) {
    let promises = [];
    if (isDir(epath) === true)  {
        let files = readDirectory(epath)
        files.forEach(element => {
            let newPath = path.join(epath,element);
            directoryFilesValidation(newPath, option1, option2)
        })
    } else if(ismdFile(epath) === true) {
        promises.push(linksAnalisis(epath, option1, option2))
    } else {
        console.log("ruta inválida")
    }
    return Promise.all(promises)
}

module.exports = {pathValidation, isDir, readDirectory, ismdFile, getLinks, linksToObjects, httpRequest, showObjectsArray, linksAnalisis, directoryFilesValidation}
