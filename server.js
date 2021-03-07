const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev }); //use next module
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // server.get("/api/auth/login", (req, res) => {
  //   console.log("comming");
  //   return app.render(req, res, "/");
  // });

  //Next Process

  server.post("*", (req, res) => {
    console.log("post");
    return handle(req, res);
  });

  server.get("*", (req, res) => {
    console.log("comming!!");
    return handle(req, res);
  });

  server.listen(7008, (err) => {
    if (err) throw err;
    console.log("listening to 3000");
  });
});
