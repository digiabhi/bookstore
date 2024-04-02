const CrudRepository = require("./crud.repository");
const { Role } = require("../models");

class RoleRepository extends CrudRepository {
  constructor() {
    super(Role);
  }

  async getRoleByType(type) {
    const role = await Role.findOne({ where: { type: type } });
    return role;
  }
}

module.exports = RoleRepository;
