const Role = require('../models/Role');

exports.getRoles = async (req, res) => {
    const roles = await Role.find();
    res.json(roles);
};

exports.addRole = async (req, res) => {
    const { name, permissions } = req.body;
    const newRole = new Role({ name, permissions });
    await newRole.save();
    res.status(201).json(newRole);
};

exports.updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body; 

        const updatedRole = await Role.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedRole) {
            return res.status(404).json({ error: 'Role not found' });
        }

        res.status(200).json(updatedRole);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteRole = async (req, res) => {
    await Role.findByIdAndDelete(req.params.id);
    res.status(204).send();
};