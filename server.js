const fs = require('fs')
const http = require('http')
const path = require('path')
const router = require('./router')

const port = 3000
const host = '127.0.0.1'

const serveFile = (response, filePath, contentType) => {
    fs.readFile(filePath, (error, data) => {
        if (error) {
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.end('Internal Server Error');
        } else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(data);
        }
    })
}

const server = http.createServer((request, response) => {
    const requestUrl = request.url

    let responsePath = '';
    let contentType = '';

    if (['css', 'js', 'png', 'jpg', 'jpeg'].includes(path.extname(requestUrl).replace(/\./, ''))) {
        const basename = path.basename(requestUrl)

        switch (path.extname(basename).replace(/\./, '')) {
            case 'css':
                responsePath = path.join('public', 'css', basename);
                break
            case 'js':
                responsePath = path.join('public', 'js', basename);
                break
            case 'png':
            case 'jpg':
            case 'jpeg':
                responsePath = path.join('public', 'images', basename);
                break
        }
            
        const data = fs.readFileSync('mime_types.json', 'utf8');
        const jsonData = JSON.parse(data)

        contentType = jsonData[path.extname(basename).replace(/\./, '')];
    } else {
        contentType = 'text/html';
        responsePath = router(requestUrl)
    }

    serveFile(response, responsePath, contentType);
})

server.listen(port, host)