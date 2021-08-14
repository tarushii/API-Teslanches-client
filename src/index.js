require('dotenv').config();
const cors = require('cors');
const express = require('express');

const app = express();
app.use(cors());
const rotas = require('./rotas');

app.use(express.json());
app.use(rotas);

app.listen(8001);
