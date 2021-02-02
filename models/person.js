"use strict";
const { UUIDV4 } = require("sequelize");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class person extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  person.init(
    {
      name: DataTypes.STRING,
      title: {
        type: DataTypes.STRING,
        validate: {
          len: [2, 3],
          isEmail: true,
        },
      },
      uui: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        // autoIncrement: true,
        defaultValue: UUIDV4(),
      },
    },
    {
      sequelize,
      modelName: "person",
    }
  );
  return person;
};
