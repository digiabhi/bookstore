"use strict";
const { Model } = require("sequelize");
const { Enums } = require("../utils/common");
const { ADMIN, AUTHOR, RETAIL_USER } = Enums.USER_ROLES_ENUMS;
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, { through: "User_Roles", as: "user" });
    }
  }
  Role.init(
    {
      type: {
        type: DataTypes.ENUM({
          values: [ADMIN, AUTHOR, RETAIL_USER],
        }),
        allowNull: false,
        defaultValue: RETAIL_USER,
      },
    },
    {
      sequelize,
      modelName: "Role",
    }
  );
  return Role;
};
