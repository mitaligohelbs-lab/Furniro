const jsonServer = require("json-server"); // importing json-server library
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Use Render's PORT or fallback to 8080
const port = process.env.PORT || 8080;

server.use(middlewares);
server.use(router);

// Start server and log the URL
server.listen(port, () => {
  console.log(`✅ JSON Server is running!`);
  console.log(`🔗 API available at http://localhost:${port}`);
});
