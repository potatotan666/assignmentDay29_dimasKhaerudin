const db = require("./db");

const createUser = `
    CREATE TABLE users(
        id INTEGER PRIMARY KEY,
        username TEXT NOT NULL,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        phone TEXT NOT NULL,
        userStatus BOOLEAN NOT NULL
    )
`;

db.serialize(() => {
  db.run(createUser, (err) => {
    if (!err) {
      console.log("table created");
    } else {
      console.log(err);
    }
  });
});
