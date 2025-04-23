import express from 'express';
import { 
  listFunkos, 
  getFunkoById, 
  addFunko, 
  updateFunko, 
  removeFunko 
} from '././controllers.js';

// Crear la aplicación Express
const app = express();

// Configurar middleware
app.use(express.json());

// Rutas para los Funkos
app.get('/funkos', listFunkos);
app.get('/funkos/:id', getFunkoById);
app.post('/funkos', addFunko);
app.patch('/funkos/:id', updateFunko);
app.delete('/funkos/:id', removeFunko);

export default app;