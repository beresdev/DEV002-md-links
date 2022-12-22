## 9. Checklist

### General

* [ ] Puede instalarse via `npm install --global <github-user>/md-links`

### `README.md`

* [ ] Un board con el backlog para la implementación de la librería.
* [ ] Documentación técnica de la librería.
* [ ] Guía de uso e instalación de la librería

### API `mdLinks(path, opts)`

* [ ] El módulo exporta una función con la interfaz (API) esperada.
* [ ] Implementa soporte para archivo individual
* [ ] Implementa soporte para directorios
* [ ] Implementa `options.validate`

### CLI

* [ ] Expone ejecutable `md-links` en el path (configurado en `package.json`)
* [ ] Se ejecuta sin errores / output esperado
* [ ] Implementa `--validate`
* [ ] Implementa `--stats`

### Pruebas / tests

* [ ] Pruebas unitarias cubren un mínimo del 70% de statements, functions,
  lines, y branches.
* [ ] Pasa tests (y linters) (`npm test`).

## 10. Achicando el problema

Un "superpoder" que esperamos puedas desarrollar durante el bootcamp
es el de definir "mini-proyectos" que te acerquen paso a paso a
la solución del "gran proyecto". Es el equivalente a comenzar armando
esquinas o bordes del rompecabezas/puzzle sin saber necesariamente
cómo encajarán al final. Déjate llevar y explora.

Estas son algunas sugerencias:

### Empieza con un diagrama de flujo

Este proyecto es distinto de los que has venido trabajando hasta ahora
dado que no hay una interfaz web, todo se desarrollará en tu editor y
consola/terminal.

Es por ello que, para visualizar mejor lo que tendrás que hacer
y planificar tus tareas y objetivos, es recomendable hacer un
`diagrama de flujo`.