const express = require("express");
const route = express.Router();
const fs = require("fs");
route.get("/login", (req, res, next) => {
  res.send(
    '<html><form method="POST" action="/user" onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)"><input type="text" name="username" id="username" placeholder="username" required><button type="submit">Login</button></form></html>'
  );
});
route.post("/user", (req, res, next) => {
  console.log(req.body.username);

  res.redirect("/");
});

route.get("/", (req, res, next) => {
  fs.readFile("chats.txt", (error, data) => {
    if (error) {
      data = "no chats";
    }
    console.log(data);
    res.send(
      `${data} <form method="POST" action="/" onsubmit="document.getElementById('id').value=localStorage.getItem('username')"><input type="text" name="msg" id="msg"><input type="hidden" id="id" name="id"><button>send</button></form>`
    );
  });
});

route.post("/", (req, res, next) => {
  console.log(req.body);
  fs.writeFile(
    "chats.txt",
    `${req.body.id}:${req.body.msg}\n`,
    { flag: "a" },
    (err) => {
      console.log(err);
    }
  );
  res.redirect("/");
});

module.exports = route;
