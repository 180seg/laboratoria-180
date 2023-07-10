const { validationResult, matchedData } = require('express-validator');
const { findAllPolicyholders, findPolicyholderById, insertPolicyholder } = require('./db.js');

function getAllPolicyholders(_req, res) {
  const policyholders = findAllPolicyholders();
  return res.json(policyholders);
}

function createPolicyholder(req, res) {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(400).json(validation.array());
  }
  const newPolicyholder = matchedData(req); // req.body validado

  if (findPolicyholderById(newPolicyholder.id)) {
    return res.status(400).json([
      {
        type: 'field',
        value: newPolicyholder.id,
        path: 'policyholderId',
        msg: `Policyholder with id=${newPolicyholder.id} already created`,
        location: 'params',
      },
    ]);
  }

  const createdPolicyholder = insertPolicyholder(newPolicyholder);
  return res.status(201).json(createdPolicyholder);
}

function getPolicyholderById(req, res) {
  // Implementar o desafio aqui!
  // Remova a linha abaixo e comece a codar :)
  res.status(501).send('Not implemented!');
}

module.exports = {
  getAllPolicyholders,
  getPolicyholderById,
  createPolicyholder,
};
