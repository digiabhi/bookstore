const { Logger } = require("../config");

class CrudRespository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const result = await this.model.create(data);
      return result;
    } catch (error) {
      Logger.log("Something went wrong in crud repo");
      throw error;
    }
  }

  async destroy(modelId) {
    try {
      await this.model.destroy({
        where: {
          bookId: modelId,
        },
      });
      return true;
    } catch (error) {
      Logger.log("Something went wrong in crud repo");
      throw error;
    }
  }

  async get(modelId) {
    try {
      const result = await this.model.findOne({
        where: {
          bookId: modelId,
        },
      });
      return result;
    } catch (error) {
      Logger.log("Something went wrong in crud repo");
      throw error;
    }
  }

  async getAll() {
    try {
      const result = await this.model.findAll();
      return result;
    } catch (error) {
      Logger.log("Something went wrong in crud repo");
      throw error;
    }
  }

  async update(modelId, data) {
    try {
      const result = await this.model.update(data, {
        where: {
          bookId: modelId,
        },
      });
      return result;
    } catch (error) {
      Logger.log("Something went wrong in crud repo");
      throw error;
    }
  }
}

module.exports = CrudRespository;
