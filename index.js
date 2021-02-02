const { Model } = require("sequelize");
const { Sequelize, DataTypes } = require("sequelize");
// const { sequelize, task, person } = require("./models");
// console.log(task.findAll().then(console.log));

// task.findOne().then(console.log);
// task.create({ title: "test the code", iscompleted: false }).then(console.log);

// task.findAll().then(console.log);

const bootstrap = async () => {
  try {
    const uri = "postgres://bob:password@localhost/aisha";
    const sequelize = new Sequelize(uri);

    // person model
    class Person extends Model {}
    Person.init(
      {
        name: DataTypes.STRING,
        title: DataTypes.STRING,
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4,
        },
      },
      {
        sequelize,
        modelName: "person",
        // freezeTableName: true,
      }
    );

    const Task = sequelize.define(
      "task",
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        // freezeTableName: false,
        // tableName: "task",
      }
    );

    // Task.belongsTo(Person, {
    //   foreignKey: {
    //     allowNull: false,
    //     name: "owner",
    //   },
    // });
    // Person.hasOne(Task, {
    //   foreignKey: {
    //     allowNull: false,
    //     name: "owner",
    //   },
    // });
    Task.belongsTo(Person, {
      foreignKey: {
        allowNull: false,
        name: "owner",
      },
    });
    // Person.hasMany(Task, {
    //   foreignKey: {
    //     name: "owner",
    //     allowNull: false,
    //   },
    // });
    // Person.hasOne(Task, {
    //   foreignKey: {
    //     name: "owner",
    //     allowNull: false,
    //   },
    // });

    // Task.belongsTo(Person, {
    //   foreignKey: {
    //     name: "owner",
    //     allowNull: false,
    //   },
    // });

    // await sequelize.drop({});
    await sequelize.sync({ force: true });
    const newPerson = await Person.create({
      name: "abu",
      title: "Full-stack software engineer",
    });
    // console.log(newPerson.dataValues);

    const newTask = await Task.create({
      title: "write clean code",
      owner: newPerson.dataValues.id,
    });
    // console.log(newTask.dataValues);

    // console.log((await Task.findOne({ include: [{ all: true }] })).dataValues);
    // console.log((await Task.findOne({ include: { all: true } })).dataValues);
    // console.log((await Task.findOne({ include: [Person] }))?.dataValues);

    // const person = (await Person.findOne({ include: Task }))?.dataValues;
    // const person = (await Person.findOne({ include: [Task] }))?.dataValues;

    // const person = (
    //   await Person.findOne({
    //     include: {
    //       all: true,
    //     },
    //   })
    // )?.dataValues;

    // const task = (
    //   await Task.findOne({
    //     include: {
    //       all: true,
    //     },
    //   })
    // )?.dataValues;

    const person = await Person.findOne();
    // const hisTask = await person.getTask();

    const task = await Task.findOne();
    const hisOwner = await task.getPerson();

    console.log(JSON.stringify(person, null, 1));
    console.log(JSON.stringify(task, null, 1));
    console.log(hisOwner.toJSON());
    // console.log(hisTask.dataValues);

    // await task.destroy({ where: { title: null } });
    // console.log(conn.config);

    // const newTask = await task.create({
    //   title: "watch the baby",
    //   owner: "9efafc17-3b6f-4aa7-9805-feb4279dd04c",
    // });
    // console.log(newTask);

    // const tasks = await task.findAll();
    // console.log(tasks);
    // const newPerson = await person.create({ name: "aisha", title: "lookman" });
    // console.log(newPerson);
  } catch (err) {
    console.error("Error:", err);
  }
};

bootstrap();
