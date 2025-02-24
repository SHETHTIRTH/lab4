const http = require('http');
const fs = require('fs');
const url = require('url'); 
const users = require('./MOCK_DATA.json'); 
const port = 1414;

const myServer = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);  
    const { pathname } = parsedUrl;  
    
    res.setHeader('Content-Type', 'application/json');
    
    if (req.method === 'GET') {
        if (pathname === '/data') {
       
            res.statusCode = 200;
            res.end(JSON.stringify({ users: users }));
        } else {
      
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Not Found' }));
        }
    }
});

myServer.listen(port, () => {
    console.log(`Server Started at PORT : ${port}`);
});
