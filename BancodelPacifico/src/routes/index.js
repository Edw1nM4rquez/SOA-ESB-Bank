const { Router } = require('express');
const router = Router();
const fs = require('fs');
const uuid = require('../../node_modules/uuid/dist/v4');
const aux = 0;

const jsonbooks = fs.readFileSync('src/books.json','utf-8')
let books = JSON.parse(jsonbooks);

const jsoncuenta = fs.readFileSync('src/cuenta.json','utf-8')
let cuentas = JSON.parse(jsoncuenta);


router.get('/', (req, res) => {
    res.render('index.ejs', {
        books
    });
    
});

router.get('/mi-cuentaBank', (req, res) => {
   /* res.render('mi-cuentaBank.ejs', {
        cuentas
    });*/
    res.send(cuentas);
});


router.get('/new-entry', (req, res) => {
    res.render('new-entry');
});




router.post('/new-entry', (req, res) => {
    const { title, autor, imagen, description } = req.body;

    if (!title || !autor || !imagen || !description) {
        res.status(400).send('Entries must have a title and description');
        return;
    }

    let newBook = {
        "user":{
       id: aux+1,
        title,
        autor,
        imagen,
        description
        }
    }

    books.push(newBook);
    const jsonBooks = JSON.stringify(books);
    fs.writeFileSync('src/books.json', jsonBooks, 'utf-8');
    res.redirect('/');

});

router.get('/delete/:id',(req,res)=>{
    books = books.filter(book => book.user.id != req.params.id);
    const jsonBooks = JSON.stringify(books);
    fs.writeFileSync('src/books.json', jsonBooks, 'utf-8');
    res.redirect('/');
});

module.exports = router;