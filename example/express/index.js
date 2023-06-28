const express = require('express');
const http = require('node:http');
const {createBookValidator} = require('./validator');
const {Dictionary} = require('../../dist/src');

const app = express();

const dictionary = new Dictionary();
const books = [
    {
        id: 1,
        name: 'One Piece',
        volume: 1,
        limitedEdition: true,
        author: 'Eiichiro Oda',
        publisher: 'VIZ Media LLC, 2003',
        release: new Date(2003/* ✨ */, 11, 12),
    }
];

app.use(express.json());

const bookMiddleware = (req, res, next) => {
    const result = createBookValidator(req.body);
    
    if (!result.every(r => r.pass)) {
        res.status(400).json({
            error: result
                .filter((r) => !r.pass)
                .map(({ key, test }) => ({ key, message: dictionary.get(test) }))
        })
        return;
    }

    next();
};

app.get('/books', (req, res) => {
    return res.status(200).json(books);
});

app.post('/books', bookMiddleware, (req, res) => {
    const book = req.body;
    book.id = books.length + 1;
    
    res.status(202).json(book);
});

const server = http.createServer(app);
server.listen('3033', () => console.log('Server started at port 3033'));