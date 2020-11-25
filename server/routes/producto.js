const express = require('express');

let app= express();

let Producto = require('../models/producto');
// ===============================
// Mostrar producto
// ===============================

app.get('/productos', (req,res)=>{
  Producto.find({}, (err, productos) => {
    if(err) {
        return res.status(500).json({
        ok: false,
        err
      });
    }

 res.status(200).send({productos});
  });
  });
// ===============================
// Crear un nuevo producto
// ===============================
app.post('/productos', (req, res)=>{
let body = req.body;
let producto = new Producto({
  nombre: body.nombre,
  precioUni: body.precioUni
});
producto.save((err,productoDB)=>{
  if(err){
      return res.status(500).json({
      ok: false,
      err
    });
  }
  if(!productoDB){
    return res.status(400).json({
    ok: false,
    err
  });
  }
  res.json({

    ok: true,
  producto: productoDB

  });
});
});

module.exports = app;
