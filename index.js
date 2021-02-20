const { Op, Sequelize, Model, DataTypes } = require("sequelize");

const uri = "postgres://bob:password@localhost/aisha";

const bootstrap = async () => {
  try {
    const sequelize = new Sequelize(uri);

    class User extends Model {}
    User.init(
      {
        firstName: DataTypes.TEXT,
        lastName: DataTypes.STRING,
      },
      { sequelize, modelName: "user" }
    );

    const Task = sequelize.define("task", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    });

    // Task.belongsTo(User, {});
    // User.hasOne(Task, {
    //   foreignKey: {
    //     allowNull: false,
    //     name: "owner",
    //   },
    //   onDelete: "CASCADE",
    // });

    User.hasMany(Task, {
      foreignKey: {
        allowNull: false,
        name: "owner",
      },
    });

    Task.belongsTo(User, {
      foreignKey: {
        allowNull: false,
        name: "owner",
      },
    });

    // await sequelize.sync();
    const users = await User.findAll({
      attributes: [sequelize.fn("sum", sequelize.col("id")), "id"],
    });
    console.log(JSON.stringify(users, null, 1));

    // const update = await Task.update(
    //   { owner: 3 },
    //   {
    //     where: {
    //       name: {
    //         [Op.iLike]: "read thE %",
    //       },
    //     },
    //   },
    //   { new: true }
    // );
    // console.log(update);

    // const newUser = await User.create({ firstName: "badass" });
    // console.log(newUser);
    // const newTask = await Task.create({
    //   name: "read the quran",
    //   isCompleted: true,
    // });
    // const allUsers = await User.findAll({
    // attributes: [
    // ["id", "myId"],
    // [sequelize.fn("COUNT", sequelize.col("firstName")), "name_count"],
    // ],
    // where: {
    //   [Op.or]: {
    //     id: [2, 1],
    //   },
    // },
    // where: {
    // lastName: {
    //   [Op.iLike]: "%ga%",
    // },
    //     firstName: {
    //       [Op.iLike]: "abu",
    //     },
    //     createdAt: {
    //       [Op.lt]: new Date(),
    //     },
    //   },
    //   include: Task,
    // });
    // console.log(allUsers[0].firstName);
    // console.log(JSON.stringify(allUsers, null, 1));

    // const tasks = await Task.findAndCountAll({
    //   where: {
    //     id: [1, 4],
    //   },
    //   include: {
    //     all: true,
    //   },
    // });
    // console.log(JSON.stringify(tasks, null, 1));
  } catch (err) {
    console.log();
    console.log("=".repeat(71));
    console.log("=".repeat(71));
    console.log();
    console.log("Error: ", err.message);
  }
};

bootstrap();
