"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Book, {
        through: "AuthorBookRelations",
        as: "books",
        foreignKey: "authorId",
        targetKey: "bookId",
        sourceKey: "authorId",
      });
    }
  }
  Author.init(
    {
      authorId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      revenue: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Author",
    }
  );
  Author.beforeCreate(async (author) => {
    const count = await Author.count();
    author.authorId = `author-${count + 1}`;
  });
  return Author;
};
