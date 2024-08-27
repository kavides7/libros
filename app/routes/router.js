
let express = require('express');
let router = express.Router();
 
const libros = require('../controllers/libros.controller.js');

router.post('/libros/libros/create', libros.create);
router.get('/libros/libros/onebyid/:id', libros.getlibrosById);
router.get('/libros/libros/filteringbyname', libros.filteringByname);
router.put('/libros/libros/update/:id', libros.updateById);
router.delete('/libros/libros/delete/:id', libros.deleteById);

module.exports = routes;