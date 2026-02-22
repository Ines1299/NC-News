const app = require("./app");
const { PORT = 9003 } = process.env;

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
