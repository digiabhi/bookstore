const CrudRepository = require("./crud.repository");
const { AuthorBookRelation } = require("../models");

class AuthorBookRelationRepository extends CrudRepository {
  constructor() {
    super(AuthorBookRelation);
  }
}

module.exports = AuthorBookRelationRepository;
