const http = require('http');
const { URL } = require('url');
const fs = require('fs');
const path = require('path');
const porta = 3000;

const servidor = http.createServer((req, res) => {
    const urlParseada = new URL(req.url, 'http://localhost');
    const caminho = urlParseada.pathname;

    const caminhoDoIndex = path.join(__dirname, 'paginas', 'index.html');
    const caminhoDoSobre = path.join(__dirname, 'paginas', 'sobre.html');

    if (caminho === '/') {
        fs.readFile(caminhoDoIndex, 'utf8', (err, conteudo) => {
            if (err) { 
                console.log(err)
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
                res.end('Erro do servidor');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(conteudo)
        });
    } else if (caminho === '/sobre') {
        fs.readFile(caminhoDoSobre, 'utf8', (err, conteudo) => {
            if (err) {
                console.log(err)
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
                res.end('Erro do servidor');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(conteudo)
        })
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Página não encontrada')
    }
});

servidor.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`)
});
