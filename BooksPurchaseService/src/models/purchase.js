"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Purchase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Purchase.init(
    {
      purchaseId: {
        type: DataTypes.STRING,
      },
      bookId: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.STRING,
      },
      purchaseDate: DataTypes.DATE,
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
        },
      },
      totalAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Purchase",
    }
  );
  Purchase.beforeCreate(async (purchase) => {
    const count = await Purchase.count();
    const today = new Date();
    const year = today.getFullYear();
    const month = `${today.getMonth() + 1}`.padStart(2, "0");
    purchase.purchaseId = `${year}-${month}-${count + 1}`;
  });
  return Purchase;
};
