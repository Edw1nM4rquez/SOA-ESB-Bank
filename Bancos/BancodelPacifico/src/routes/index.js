const { Router } = require('express');
const router = Router();
const fs = require('fs');
const uuid = require('../../node_modules/uuid/dist/v4');
const aux = 0;
const cores = require('cors');
const { v4: uuidv4 } = require('uuid')

const jsonbooks = fs.readFileSync('src/books.json', 'utf-8')
let books = JSON.parse(jsonbooks);

const jsoncuenta = fs.readFileSync('src/cuenta.json', 'utf-8')
let cuentas = JSON.parse(jsoncuenta);


const jsontransacciones = fs.readFileSync('src/transacciones.json', 'utf-8')
let transacciones = JSON.parse(jsontransacciones);



router.get('/', (req, res) => {
    res.render('index.ejs', {
        books
    });

});

router.get('/user', (req, res) => {
  /*  res.render('transaccion.ejs', {
        cuentas
    });*/
    res.send(cuentas);
});

router.get('/transaccion',(req,res)=>{
    
    res.send(transacciones)
});

router.get('/new-entry', (req, res) => {
    res.render('new-entry');
});

router.get('/mi-cuentaBank', (req, res) => {
    res.render('mi-cuentaBank');
});

router.get('/deposito', (req, res) => {
    res.render('Deposito');
});





router.post('/despositoEj',(req,res)=>{
 console.log("Parametros",req.body),
 res.send(req.body);
});


router.post('/comprobarFondos',(req,res)=>{
    console.log("Parametros",req.body);
    var monto = req.body.monto;
    var tipo = req.body.tipo;
    var bancodest = req.body.bancodest;
    var bancoorigen = req.body.bancoorigen;



    res.send(req.body);
});



router.post('/transferencia', function (req, res) {
    var monto = req.body.monto;
    var tipo = req.body.tipo;
    var bancodest = req.body.bancodest;
    var bancoorigen = req.body.bancoorigen;

     console.log("tipo = "+tipo+", monto "+monto);
  
    let newTransaccion = {
        "transaccion": {
            id: uuidv4(),
            monto,
            tipo,
            bancodest,
            bancoorigen
        }
    }

    let updateCuenta = {
        "cuenta": {
            id: cuentas[0].cuenta.id,
            titular: cuentas[0].cuenta.titular,
            ci: cuentas[0].cuenta.ci,
            banco: cuentas[0].cuenta.banco,
            monto: parseFloat(cuentas[0].cuenta.monto) + parseFloat(monto)
        }

    }
    cuentas = cuentas.filter(cuenta => cuenta.cuenta.id != 1);
    const jsnCuentas = JSON.stringify(cuentas);
    fs.writeFileSync('src/cuenta.json', jsnCuentas, 'utf-8');

    cuentas.push(updateCuenta);
    const jsnCuentasE = JSON.stringify(cuentas);
    fs.writeFileSync('src/cuenta.json', jsnCuentasE, 'utf-8');

    transacciones.push(newTransaccion);
    const jsonTransacciones = JSON.stringify(transacciones);
    fs.writeFileSync('src/transaccion.json', jsonTransacciones, 'utf-8');
    res.redirect('/');

});









router.post('/deposito', (req, res) => {

    const { cantidad } = req.body;
    if (!cantidad) {
        res.status(400).send('Entries must have a title and description');
        return;
    }
    let auxCantidad = parseFloat(cantidad)
    let auxCantidadA = parseFloat(cuentas[0].cuenta.monto)
    let resultado = auxCantidadA + auxCantidad;

    let updateCuenta = {
        cuenta: {
            id: cuentas[0].cuenta.id,
            titular: cuentas[0].cuenta.titular,
            ci: cuentas[0].cuenta.ci,
            banco: cuentas[0].cuenta.banco,
            monto: resultado
        }
    }

    let updateTranssacicon = {
        transaccion: {
            id: transacciones[0].transaccion.id,
            monto: resultado,
            tipo: transacciones[0].transaccion.tipo,
            cuenta: {
                id: cuentas[0].cuenta.id,
                titular: cuentas[0].cuenta.titular,
                ci: cuentas[0].cuenta.ci,
                banco: cuentas[0].cuenta.banco,
                monto: resultado
            }
        }
    }

        cuentas = cuentas.filter(cuenta => cuenta.cuenta.id != 1);
        transacciones = transacciones.filter(trans => trans.transaccion.id != 1);

        transacciones.push(updateTranssacicon);
        cuentas.push(updateCuenta);

        const jsonCuentas = JSON.stringify(cuentas);
        fs.writeFileSync('src/cuenta.json', jsonCuentas, 'utf-8');

        const jsonTransaccion = JSON.stringify(transacciones);
        fs.writeFileSync('src/transacciones.json', jsonTransaccion, 'utf-8');

        res.redirect('/transaccion');


    });


router.post('/new-entry', (req, res) => {
    const { title, autor, imagen, description } = req.body;

    if (!title || !autor || !imagen || !description) {
        res.status(400).send('Entries must have a title and description');
        return;
    }
    let newBook = {
        "user": {
            id: uuidv4(),
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

router.post('/mi-cuentaBank', (req, res) => {
    const { titular, ci, banco, monto } = req.body;
    if (!titular || !ci || !banco || !monto) {
        res.status(400).send('Entries must have a title and description');
        return;
    }

    let newCuenta = {
        "cuenta": {
            id: uuidv4(),
            titular,
            ci,
            banco,
            monto
        }
    }
    cuentas.push(newCuenta);
    const jsonCuentas = JSON.stringify(cuentas);
    fs.writeFileSync('src/cuenta.json', jsonCuentas, 'utf-8');
    res.redirect('/');

});

router.get('/delete/:id', (req, res) => {
    books = books.filter(book => book.user.id != req.params.id);
    const jsonBooks = JSON.stringify(books);
    fs.writeFileSync('src/books.json', jsonBooks, 'utf-8');
    res.redirect('/');
});



module.exports = router;