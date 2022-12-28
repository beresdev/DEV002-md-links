const {pathValidation, directoryFilesValidation} = require('./main.js')
const path = require('node:path');

function mdLinks(epath, option1, option2) {
    console.log("Entrando a mdLinks")
    let entryPath = pathValidation(epath);

    return new Promise((res, rej) => {
        if(entryPath === undefined) {
            return rej(console.log("No ingresaste ruta(path) válida "))
        } if(option1 === undefined) {
            return res(directoryFilesValidation(entryPath, option1, option2))
        } if((option1 === "--stats" || option1 === "--validate")&& option2 == undefined) {
            return res(directoryFilesValidation(entryPath, option1, option2))
        } if(option1 === "--stats" && option2 === "--validate") {
            return res(directoryFilesValidation(entryPath, option1, option2))
        } else if ((option1 != "--stats" || option1 != "--validate")&& option2 == undefined) {
            return rej(console.log("Parametro incorrecto"))
        } else if ((option1 != "--stats" && option2 != "--validate") || (option1 == "--stats" && option2 != "--validate") || (option1 != "--stats" && option2 == "--validate")) {
            return rej(console.log("Alguno(s) de tus parametros es(son) incorrecto(s)"))
        }
    })
}

module.exports = {mdLinks}