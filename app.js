#!/usr/bin/env node

const express = require('express')
const fs = require('fs')
const serveIndex = require('serve-index')
const program = require('commander')
const path  = require('path')

const app = express()

program
    .version(require('./package.json').version)
    .option('-p, --port <n>', 'port', parseInt)
    .option('-d, --dir <n>', 'root directory')
    .parse(process.argv)

const port = program.port || process.env['PORT'] || 3000
const dir = path.join(program.dir || process.env['ROOT_DIR'] || process.cwd(), '/')

const signals = ['SIGTERM', 'SIGINT']
signals.forEach(signal => {
    process.on(signal, () => {
        process.exit(0)
    })
})

app.get('/', function (req, res) {
    res.redirect('/list')
})

app.use('/swagger', express.static(__dirname + '/swagger'))
app.use('/raw', express.static(dir))
app.use('/list', function (req, res, next) {
    const filepath = path.join(dir, '/', req.path)

    fs.stat(filepath, function (err, stats) {
        if (err) return next()

        if (stats.isFile()) {
            res.redirect('/swagger?url=../raw/' + req.path)
            return
        }
        next()
    })
})

app.use('/list', serveIndex(dir, {'icons': true}))

app.listen(port)

console.log('Running on port ' + port)
