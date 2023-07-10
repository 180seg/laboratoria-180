const express = require('express');
const { checkSchema } = require('express-validator');
const { getAllPolicyholders, createPolicyholder, getPolicyholderById } = require('./controller.js');

const app = express();
const port = 3000;

// Nossa API irá trabalhar com JSON
app.use(express.json());

// ROTAS DA API

// Lista todos os segurados cadastrados
app.get('/policyholders', getAllPolicyholders);

// Cadastra um novo segurado
app.post(
  '/policyholders',
  // Schema para validação de um novo segurado
  checkSchema(
    {
      id: {
        isInt: true,
        toInt: true,
        errorMessage: 'Invalid policyholder ID',
      },
      name: {
        notEmpty: true,
        errorMessage: 'Invalid policyholder name',
      },
    },
    ['body'], // Iremos validar o atributo `req.body`
  ),
  createPolicyholder,
);

// Busca um segurado por ID
app.get(
  '/policyholders/:policyholderId',
  // Schema para validação do parâmetro :policyholderId
  checkSchema(
    {
      policyholderId: {
        isInt: true,
        toInt: true,
        errorMessage: 'Invalid policyholder ID',
      },
    },
    ['params'], // Iremos validar o atributo `req.params`
  ),
  getPolicyholderById,
);

app.listen(port, () => {
  console.log(`Desafio Laboratoria <> 180 Seguros rodando na porta ${port}`);
});
