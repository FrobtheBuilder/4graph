"use strict"
let http = require("http")
let httpProxy = require("http-proxy")

let proxy = httpProxy.createProxyServer({})

proxy.on('proxyRes', function (proxyRes, req, res) {
    console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
    proxyRes.headers["access-control-allow-origin"] = "*"
})

let server = http.createServer(function(req, res) {
    proxy.web(req, res, {
        target: 'http://a.4cdn.org',
        changeOrigin: true
    })
})

console.log("listening on port 5050")
server.listen(5050);
