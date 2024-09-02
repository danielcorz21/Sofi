const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const port = 5500;
const app = express();
const bcrypt = require('bcrypt'); // Para la encriptación de contraseñas

app.use(bodyParser.urlencoded({extended :true }));
app.use(express.json());

mongoose.connect('mongodb+srv://danielcorz21:1997Maria@cluster0.pq8sspz.mongodb.net/sofiudes')

app.use(express.static(path.join(__dirname, 'public')));

//////////////////////////estructura de bases de formularios////////////////////////////////

////formulario de registro

const formiRegistro = {
    nombre_completo :String,
    username :String,
    correo :String,
    password :String
  } 
const Note = mongoose.model('Registro_Usuarios', formiRegistro);

////formulario de logeo

const formilogeo = {
    Username :String,
    Password :String
  } 
const note2 = mongoose.model('logeo', formilogeo);


////formulario de registro de venta

const formiRVentas = {
    codigo_documento :String,
    descripcion_documento :String,
    resolucion_dian :String,
    numero_resolucion :String,
    fecha_inicio :String,
    vigencia :String,
    fecha_fin :String,
    prefijo :String,
    consecutivo_inical :String,
    consecutivo_final :String,
    manejo_aiu :String,
    retenciones :String,
    cuenta_contable :String,
    autoretenciones :String,
    cuenta_contable1 :String,
    tipo_impresion :String,
    activo :String

  } 
const Note3 = mongoose.model('Formulario_Ventas', formiRVentas);

////formulario de registro de compras

const formiRcompras = {
    codigo_documento_c :String,
    descripcion_documento_c :String,
    documento_soporte_c :String,
    numero_resolucion_c :String,
    fecha_inicio_c :String,
    vigencia_c :String,
    fecha_fin_c :String,
    prefijo_c :String,
    consecutivo_inical_c :String,
    consecutivo_final_c :String,
    retenciones_c :String,
    cuenta_contable_c :String,
    activo_c :String

  } 
const Note4 = mongoose.model('Formulario_compras', formiRcompras);

////formulario de registro recibo de caja

const formiRcajas = {
    codigo_documento_rc :String,
    descripcion_documento_rc :String,
    consecutivo_rc :String,
    activo_rc :String

  } 
const Note5 = mongoose.model('Formulario_cajas', formiRcajas);

////formulario de registro comprobante egreso

const formiCegresos = {
    codigo_documento_ce :String,
    descripcion_documento_ce :String,
    consecutivo_ce :String,
    activo_ce :String

  } 
const Note6 = mongoose.model('Formulario_egresos', formiCegresos);

////formulario de registro comporbante contable

const formiCcontable = {
    codigo_documento_cc :String,
    descripcion_documento_cc :String,
    consecutivo_cc :String,
    activo_cc :String

  } 
const Note7 = mongoose.model('Formulario_contable', formiCcontable);




///////////////////////////////////RUTAS////////////////////////////////////////////////////
// Ruta para la página de inicio
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.post('/', function(req, res) {
    
});
//cerrar secion
app.get('/cs', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.post('/cs', function(req, res) {
    
});
// Ruta GET para inicio html y se pueda ejecutar en el server
app.get('/inicio', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
// Ruta GET para inicio de los formularios, se hace para no enviar datos
// vacios a la base de datos, esto se debe a que antes inciaba y se enviaban  
// vacios, tambien solo se le agrega una s al final en los forms, permitiendo
//el flujo de los botones en las intancias, sin errores 
app.get('/inicios', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Ruta POST para inicio
app.post('/inicios', async function(req, res) {
    const { username, password } = req.body;
    try {
        const usuario = await Note.findOne({ username });
        if (usuario) {
            const validPassword = await bcrypt.compare(password, usuario.password);
            if (validPassword) {
                // Contraseña correcta, redirige al usuario al dashboard u otra página
                res.redirect('/baselogeo');
            } else {
                // Contraseña incorrecta
                res.redirect('/inicios');
                res.status(401).json({ message: 'Contraseña incorrecta' });
            }
        } else {
            // Usuario no encontrado
            res.redirect('/inicios');
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al buscar el usuario:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
});;

//Ruta POST para inico
app.post('/inicio', function(req, res) {
    // Aquí podrías manejar la lógica del registro, por ejemplo, guardar los datos en la base de datos
    console.log('Datos de registro:', req.body);
    res.redirect('/inicio');
});

// Ruta GET para registrarse
app.get('/registrarse', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'registroNuevos.html'));
});
app.post('/registrarse', function(req, res) {
    // Aquí podrías manejar la lógica del login, por ejemplo, verificar los datos del usuario
    console.log('Datos de logeo:', req.body);
    res.redirect('/registrarse');
});


// Ruta POST para registrarse
app.post('/registrarses', async function(req, res) {
    const { nombre_completo, username, correo, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        let newNote = new Note({
            nombre_completo,
            username,
            correo,
            password: hashedPassword
        });
        await newNote.save();
        console.log('Datos de registro:', req.body);
        res.redirect('/registrarse');
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).send('Error del servidor');
    }
});


// Ruta GET para baselogeo
app.get('/baselogeo', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'Base', 'dashboard.html'));
});

// Ruta POST para baselogeo
app.post('/baselogeo', function(req, res) {
    // Aquí podrías manejar la lógica del login, por ejemplo, verificar los datos del usuario
    console.log('Datos de logeo:', req.body);
    res.redirect('/baselogeo');
});

//////////////////////////////Documentos/////////////////////////////////////////////////
// Ruta GET para Menu Documentos
app.get('/mmdocumentos', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'Base', 'Documentos','menudocumentos.html'));
});

// Ruta POST para Menu Documentos
app.post('/mmdocumentos', function(req, res) {
    // Aquí podrías manejar la lógica del login, por ejemplo, verificar los datos del usuario
    console.log('Datos de logeo:', req.body);
    res.redirect('/mmdocumentos');
});


// Ruta GET para Documentos Factura de Venta
app.get('/dcFactVenta', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'Base', 'Documentos','documentosfacturadeventa.html'));
});

// Ruta POST para Documentos Factura de Venta
app.post('/dcFactVenta', function(req, res) {
    // Aquí podrías manejar la lógica del login, por ejemplo, verificar los datos del usuario
    let newNote3 = new Note3 ({
    UsuarioA: req.body.username,
    codigo_documento :req.body.codigo_documento,
    descripcion_documento :req.body.descripcion_documento,
    resolucion_dian :req.body.resolucion_dian,
    numero_resolucion :req.body.numero_resolucion,
    fecha_inicio :req.body.fecha_inicio,
    vigencia :req.body.vigencia,
    fecha_fin :req.body.fecha_fin,
    prefijo :req.body.prefijo,
    consecutivo_inical :req.body.consecutivo_inical,
    consecutivo_final :req.body.consecutivo_final,
    manejo_aiu :req.body.manejo_aiu,
    retenciones :req.body.retenciones,
    cuenta_contable :req.body.cuenta_contable,
    autoretenciones :req.body.autoretenciones,
    cuenta_contable1 :req.body.cuenta_contable1,
    tipo_impresion :req.body.tipo_impresion,
    activo :req.body.activo

      });
      newNote3.save();
    console.log('Datos de logeo:', req.body);
    res.redirect('/dcFactVenta');
});



// Ruta DELETE para eliminar Documentos Factura de Venta
app.delete('/dcFactVenta/:id', async function(req, res) {
    try {
        await Note3.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: 'Documento eliminado exitosamente' });
    } catch (err) {
        res.status(500).send(err);
    }
});


// Ruta PUT para actualizar Documentos Factura de Venta
app.put('/dcFactVentaPut/:id', async function(req, res) {
    try {
      const updatedDocument = await Note3.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
      if (!updatedDocument) {
        return res.status(404).send({ error: 'Documento de factura de venta no encontrado.' });
      }
  
      res.status(200).send(updatedDocument);
    } catch (err) {
      console.error('Error al actualizar el documento:', err);
      res.status(500).send({ error: 'Error interno al actualizar el documento.' });
    }
  });
  



// Ruta GET para Documentos Factura de compra
app.get('/dcFactCompra', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'Base', 'Documentos','documentosfacturadecompra.html'));
});

// Ruta POST para Documentos Factura de compra
app.post('/dcFactCompra', function(req, res) {
    // Aquí podrías manejar la lógica del login, por ejemplo, verificar los datos del usuario
    let newNote4 = new Note4 ({
    codigo_documento_c :req.body.codigo_documento_c ,
    descripcion_documento_c :req.body.descripcion_documento_c,
    documento_soporte_c :req.body.documento_soporte_c,
    numero_resolucion_c :req.body.numero_resolucion_c,
    fecha_inicio_c :req.body.fecha_inicio_c,
    vigencia_c :req.body.vigencia_c,
    fecha_fin_c :req.body.fecha_fin_c,
    prefijo_c :req.body.prefijo_c,
    consecutivo_inical_c :req.body.consecutivo_inical_c,
    consecutivo_final_c :req.body.consecutivo_final_c,
    retenciones_c :req.body.retenciones_c,
    cuenta_contable_c :req.body.cuenta_contable_c,
    activo_c :req.body.activo_c

      });
      newNote4.save();
    console.log('Datos de logeo:', req.body);
    res.redirect('/dcFactCompra');
});

// Ruta DELETE para eliminar Documentos Factura de compra
app.delete('/dcFactCompra/:id', async function(req, res) {
    try {
        await Note3.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: 'Documento eliminado exitosamente' });
    } catch (err) {
        res.status(500).send(err);
    }
});


// Ruta PUT para actualizar Documentos Factura de compra
app.put('/dcFactCompraPut/:id', async function(req, res) {
    try {
      const updatedDocument = await Note3.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
      if (!updatedDocument) {
        return res.status(404).send({ error: 'Documento de factura de venta no encontrado.' });
      }
  
      res.status(200).send(updatedDocument);
    } catch (err) {
      console.error('Error al actualizar el documento:', err);
      res.status(500).send({ error: 'Error interno al actualizar el documento.' });
    }
  });
  


// Ruta GET para Documentos recibo de caja
app.get('/dcReciCaja', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'Base', 'Documentos','documentosrecibodecaja.html'));
});

// Ruta POST para Documentos recibo de caja
app.post('/dcReciCaja', function(req, res) {
    // Aquí podrías manejar la lógica del login, por ejemplo, verificar los datos del usuario
    let newNote5 = new Note5 ({
        codigo_documento_rc :req.body.codigo_documento_rc,
        descripcion_documento_rc :req.body.descripcion_documento_rc,
        consecutivo_rc :req.body.consecutivo_rc,
        activo_rc :req.body.activo_rc

      });
      newNote5.save();
    console.log('Datos de logeo:', req.body);
    res.redirect('/dcReciCaja');
});

// Ruta DELETE para eliminar Documentos Recibo de Caja
app.delete('/dcFacReciCaja/:id', async function(req, res) {
    try {
        await Note5.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: 'Documento eliminado exitosamente' });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Ruta PUT para actualizar Documentos recibo caja
app.put('/dcFactReCja/:id', async function(req, res) {
    try {
      const updatedDocument = await Note3.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
      if (!updatedDocument) {
        return res.status(404).send({ error: 'Documento de factura de venta no encontrado.' });
      }
  
      res.status(200).send(updatedDocument);
    } catch (err) {
      console.error('Error al actualizar el documento:', err);
      res.status(500).send({ error: 'Error interno al actualizar el documento.' });
    }
  });



// Ruta GET para Documentos comprobante de egreso
app.get('/dcComproEgreso', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'Base', 'Documentos','documentoscomprobantedeegreso.html'));
});

// Ruta POST para Documentos comprobante de egreso
app.post('/dcComproEgreso', function(req, res) {
    // Aquí podrías manejar la lógica del login, por ejemplo, verificar los datos del usuario
    let newNote6 = new Note6 ({
        codigo_documento_ce :req.body.codigo_documento_ce,
        descripcion_documento_ce :req.body.descripcion_documento_ce,
        consecutivo_ce :req.body.consecutivo_ce,
        activo_ce :req.body.activo_ce

      });
      newNote6.save();
    console.log('Datos de logeo:', req.body);
    res.redirect('/dcComproEgreso');
});

// Ruta DELETE para eliminar Documentos Factura de comprobate de egresso
app.delete('/dcFactComEgreso/:id', async function(req, res) {
    try {
        await Note3.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: 'Documento eliminado exitosamente' });
    } catch (err) {
        res.status(500).send(err);
    }
});


// Ruta PUT para actualizar Documentos comprobante egreso
app.put('/dcFactComEgre/:id', async function(req, res) {
    try {
      const updatedDocument = await Note3.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
      if (!updatedDocument) {
        return res.status(404).send({ error: 'Documento de factura de venta no encontrado.' });
      }
  
      res.status(200).send(updatedDocument);
    } catch (err) {
      console.error('Error al actualizar el documento:', err);
      res.status(500).send({ error: 'Error interno al actualizar el documento.' });
    }
  });


// Ruta GET para Documentos comprobante contable
app.get('/dcComproContable', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'Base', 'Documentos','documentoscomprobantecontable.html'));
});

// Ruta POST para Documentos comprobante contable
app.post('/dcComproContable', function(req, res) {
    // Aquí podrías manejar la lógica del login, por ejemplo, verificar los datos del usuario
    let newNote7 = new Note7 ({
        codigo_documento_cc :req.body.codigo_documento_cc,
        descripcion_documento_cc :req.body.descripcion_documento_cc,
        consecutivo_cc :req.body.consecutivo_cc,
        activo_cc :req.body.activo_cc

      });
      newNote7.save() .then(() => {
        console.log('Datos guardados:', req.body);
        res.redirect('/dcComproContable');
      })
});

// Ruta DELETE para eliminar Documentos Factura de comprobate de contable
app.delete('/dcFactComcontable/:id', async function(req, res) {
    try {
        await Note3.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: 'Documento eliminado exitosamente' });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Ruta PUT para actualizar Documentos comprobante contable
app.put('/dcFactComContable/:id', async function(req, res) {
    try {
      const updatedDocument = await Note3.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
      if (!updatedDocument) {
        return res.status(404).send({ error: 'Documento de factura de venta no encontrado.' });
      }
  
      res.status(200).send(updatedDocument);
    } catch (err) {
      console.error('Error al actualizar el documento:', err);
      res.status(500).send({ error: 'Error interno al actualizar el documento.' });
    }
  });

//////////////////////////////libros/////////////////////////////////////////////////
// Ruta GET para Menu libros
app.get('/mmlibros', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'Base', 'libros','menulibros.html'));
});

// Ruta POST para Menu libros
app.post('/mmlibros', function(req, res) {
    // Aquí podrías manejar la lógica del login, por ejemplo, verificar los datos del usuario
    console.log('Datos de logeo:', req.body);
    res.redirect('/mmlibros');
});


// Ruta GET para libros de ventas
app.get('/mlventas', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'Base', 'libros','libroslibrodeventas.html'));
});
app.get('/api/mlventas', async function(req, res) {
    try {
        const allNotes = await Note3.find();
        res.json(allNotes); // Envía los registros como respuesta JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los registros' });
    }
});
// Ruta POST para libros de ventas
app.post('/mlventas',async function(req, res) {
    // Aquí podrías manejar la lógica del login, por ejemplo, verificar los datos del usuario
    try {
        const allNotes = await Note3.find();
        console.log(allNotes); // Muestra los registros en la consola
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los registros' });
    }
    console.log('Datos de logeo:', req.body);
    res.redirect('/mlventas');
});

/////////////////////////////compras////////////////////////////////////

// Ruta GET para libros de compras
app.get('/mlcompras', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'Base', 'libros','libroslibrodecompras.html'));
});
app.get('/api/compras', async function(req, res) {
    try {
        const allNotes1 = await Note4.find();
        res.json(allNotes1); // Envía los registros como respuesta JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los registros' });
    }
});
// Ruta POST para libros de compras
app.post('/mlcompras',async function(req, res) {
    // Aquí podrías manejar la lógica del login, por ejemplo, verificar los datos del usuario
    try {
        const allNotes1 = await Note4.find();
        console.log(allNotes1); // Muestra los registros en la consola
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los registros' });
    }
    console.log('Datos de logeo:', req.body);
    res.redirect('/mlcompras');
});

/////////////////////////////Movimiento de caja////////////////////////////////////

// Ruta GET para Movimiento de caja
app.get('/mlcajas', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'Base', 'libros','librosmovimientodecaja.html'));
});
app.get('/api/cajas', async function(req, res) {
    try {
        const allNotes2 = await Note5.find();
        res.json(allNotes2); // Envía los registros como respuesta JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los registros' });
    }
});
// Ruta POST para Movimiento de caja
app.post('/mlcajas',async function(req, res) {
    // Aquí podrías manejar la lógica del login, por ejemplo, verificar los datos del usuario
    try {
        const allNotes2 = await Note5.find();
        console.log(allNotes2); // Muestra los registros en la consola
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los registros' });
    }
    console.log('Datos de logeo:', req.body);
    res.redirect('/mlcajas');
});

/////////////////////////////Comprobante egresos////////////////////////////////////

// Ruta GET para Comprobante egresos
app.get('/compegreso', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'Base', 'libros','libroslibrocomprobanteegreso.html'));
});
app.get('/api/compegreso', async function(req, res) {
    try {
        const allNotes3 = await Note6.find();
        res.json(allNotes3); // Envía los registros como respuesta JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los registros' });
    }
});
// Ruta POST para Comprobante egresos
app.post('/compegreso',async function(req, res) {
    // Aquí podrías manejar la lógica del login, por ejemplo, verificar los datos del usuario
    try {
        const allNotes3 = await Note6.find();
        console.log(allNotes3); // Muestra los registros en la consola
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los registros' });
    }
    console.log('Datos de logeo:', req.body);
    res.redirect('/compegreso');
});

/////////////////////////////Comprobante egresos////////////////////////////////////

// Ruta GET para Comprobante contables
app.get('/compconta', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'Base', 'libros','lirbroslibrocomprobantecontable.html'));
});
app.get('/api/compconta', async function(req, res) {
    try {
        const allNotes4 = await Note7.find();
        res.json(allNotes4); // Envía los registros como respuesta JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los registros' });
    }
});
// Ruta POST para Comprobante contables
app.post('/compconta',async function(req, res) {
    // Aquí podrías manejar la lógica del login, por ejemplo, verificar los datos del usuario
    try {
        const allNotes4 = await Note7.find();
        console.log(allNotes4); // Muestra los registros en la consola
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los registros' });
    }
    console.log('Datos de logeo:', req.body);
    res.redirect('/compconta');
});



//////////////////////////////perfil/////////////////////////////////////////////////

// Ruta GET para Documentos comprobante contable
app.get('/dcPerfil', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'Base', 'Documentos','perfil.html'));
});

// Ruta POST para Documentos comprobante contable
app.post('/dcPerfil', function(req, res) {
    // Aquí podrías manejar la lógica del login, por ejemplo, verificar los datos del usuario
    console.log('Datos de logeo:', req.body);
    res.redirect('/dcPerfil');
});

app.listen(port,()=> {
    console.log('correcto')
  })