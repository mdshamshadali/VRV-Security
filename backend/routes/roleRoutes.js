const express = require('express');
const router = express.Router();
const { getRoles, deleteRole, addRole, updateRole } = require('../controllers/roleController')

router.get('/', getRoles);
router.post('/', addRole);
router.put('/:id', updateRole);
router.delete('/:id', deleteRole);

module.exports = router;
