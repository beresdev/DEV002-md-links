#!/usr/bin/env node
const process = require('process');
const {mdLinks} = require('./mdlinks.js')

let args = process.argv;

let epath = args[2];
let option1 = args[3];
let option2 = args[4];

mdLinks(epath, option1, option2)
.catch((error) => {
    console.log("Sin resultados por error en ruta u opciones")
})

module.exports = {mdLinks};

