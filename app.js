const express = require('express');
const bodyParser = require('body-parser');
const controladorCliente = require('./controller.js');

const app = express(); 
const porta = 3000; 

app.use(bodyParser.json());

app.post('/clientes', controladorCliente.criarCliente);
app.get('/clientes', controladorCliente.obterTodosClientes);
app.get('/clientes/:id', controladorCliente.obterClientePorId);
app.put('/clientes/:id', controladorCliente.atualizarCliente);
app.delete('/clientes/:id', controladorCliente.excluirCliente);

app.listen( porta, () => {
    console.log(`servidor no ar na porta ${porta}`); 
})


/*
criação da tabela 
CREATE DATABASE IF NOT EXISTS mcliente;

USE mcliente;

CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(40) NOT NULL,
    endereco VARCHAR(40),
    cidade VARCHAR(30)
);
*/