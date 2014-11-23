var app   = require('http').createServer(handler),
    url   = require('url'),
    fs    = require('fs'),
    path  = require('path'),
    io    = require('socket.io').listen(app);
    
app.listen(8080);

/**
 * Serve static html/css/js Files
 */
function handler (req, res) {
    var uri       = url.parse(req.url).pathname,
        filename  = path.join(process.cwd(), "client", unescape(uri)),
        mimeTypes = { "html": "text/html", "js": "text/javascript", "css": "text/css"},
        stats;

    try {
        stats = fs.lstatSync(filename); // throws if path doesn't exist
    } catch (e) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('404 Not Found\n');
        res.end();
        return;
    }

    if (stats.isFile()) {   // path exists, is a file
        var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
        res.writeHead(200, {'Content-Type': mimeType} );

        var fileStream = fs.createReadStream(filename);
        fileStream.pipe(res);
    } else {    // path is a directory or Symbolic link, other?
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.write('500 Internal server error\n');
        res.end();
    }

}

/**
 * Realtime communication for control messages
 */
io.sockets.on('connection', function (socket) {
    // first answer
    socket.emit('connected', { 'SocketID': socket.id });

    socket.on('register', function(){
        // TODO: handle register requests from sender and receiver clients to bring them together
    });

    // control signal handler
    socket.on('cs', function (data) {
        // TODO: send the data to the appropiate receiver
        io.sockets.emit('cs', data);
        console.log(data);
    });
    // disconnet handler
    socket.on('disconnect', function(){});
});