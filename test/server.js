var http = require('http'),
    fs = require('fs'),
    path = require('path');

function getFile(url, response) {
    var file = path.join(process.cwd(), url);

    path.exists(file, function (exists) {
        if (exists) {
            response.writeHead(200);
            fs.createReadStream(file, {flags: 'r'}).pipe(response);
        } else {
            response.writeHead(404);
            response.end();
        }
    });
}

var server = http.createServer(function(request, response) {
    var url = request.url;

    if (/\/fonts\//.test(url)) {
        setTimeout(function() {
            getFile(url, response);
        }, 1000);
    } else {
        getFile(url, response);
    }
}).listen(3008);
