const { task } = require("./models");
// console.log(task.findAll().then(console.log));

// task.findOne().then(console.log);
// task.create({ title: "test the code", iscompleted: false }).then(console.log);

// task.findAll().then(console.log);

const bootstrap = async () => {
  await task.destroy({ where: { title: null } });

  const tasks = await task.findAll();
  console.log(tasks);
};

bootstrap();
