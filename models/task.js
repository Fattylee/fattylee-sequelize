"use strict";
const { UUIDV4 } = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      task.belongsTo(models.person, {
        foreignKey: {
          allowNull: false,
          // name: "owner",
          field: "owner",
        },
        // foreignKey: "owner",
      });

      // models.person.hasOne(task, {
      //   foreignKey: {
      //     field: "owner",
      //     allowNull: false,
      //   },
      // });

      // models.person.hasMany(task);
    }
  }

  task.init(
    {
      title: DataTypes.STRING,
      iscompleted: DataTypes.BOOLEAN,
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
      modelName: "task",
      getterMethods: {
        fullname: function () {
          // return this.title + " " + this.iscompleted;
          return "less than";
        },
      },
    }
  );

  return task;
};
