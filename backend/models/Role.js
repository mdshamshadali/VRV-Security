const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  permissions: [{ type: String }],
});

const Role = mongoose.model('Role', RoleSchema);
module.exports = Role;
