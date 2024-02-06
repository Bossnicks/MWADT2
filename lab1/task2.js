const http = require('http');

const server = http.createServer((req, res) => {
    // Определяем данные запроса
    const method = req.method;
    const url = req.url;
    const httpVersion = req.httpVersion;
    const headers = req.headers;
    
    let body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();

        // Формируем HTML-страницу с содержимым запроса
        const responseBody = `
            <html>
            <head>
                <title>Request Details</title>
            </head>
            <body>
                <h1>Request Details</h1>
                <p><strong>Method:</strong> ${method}</p>
                <p><strong>URL:</strong> ${url}</p>
                <p><strong>HTTP Version:</strong> ${httpVersion}</p>
                <p><strong>Headers:</strong> ${JSON.stringify(headers)}</p>
                <p><strong>Body:</strong> ${body}</p>
            </body>
            </html>
        `;

        // Отправляем ответ с HTML-страницей
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(responseBody);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
