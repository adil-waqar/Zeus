const app = require('../app');

const port = parseInt(process.env.PORT, 10) || 8000;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
