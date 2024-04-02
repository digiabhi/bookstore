"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Author, {
        through: "AuthorBookRelations",
        as: "authors",
        foreignKey: "bookId",
        targetKey: "authorId",
        sourceKey: "bookId",
      });
    }
  }
  Book.init(
    {
      bookId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      sellCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          isNumeric: true,
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { len: [3, 255] },
      },
      description: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
          min: 100,
          max: 1000,
        },
      },
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  Book.beforeCreate(async (book) => {
    const count = await Book.count();
    console.log(count);
    book.bookId = `book-${count + 1}`;
  });
  return Book;
};
