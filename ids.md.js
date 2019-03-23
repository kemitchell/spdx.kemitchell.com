#!/usr/bin/env node

var https = require('https')
var URL = 'https://spdx.org/licenses/licenses.json'

https.get(URL, function (response) {
  var chunks = []
  response
    .on('data', function (chunk) {
      chunks.push(chunk)
    })
    .once('error', function (error) {
      console.error(error)
      process.exit(1)
    })
    .once('end', function () {
      var body = Buffer.concat(chunks)
      var parsed = JSON.parse(body)
      parsed.licenses.forEach(function (license) {
        var id = license.licenseId
        console.log(`[${id}](https://spdx.org/licenses/${id}.html)\n`)
      })
    })
})
