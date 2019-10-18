const db = require("../database/dbConfig");

const Users = require("./usersModel");

describe("usersModel", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("add()", () => {
    it("Insert the user into the db", async () => {
      await Users.add({ username: "username", password: "password" });

      const users = await db("users");

      expect(users).toHaveLength(1);
    });
  });

  describe("find()", () => {
    it("Returns an object ", async () => {
      await Users.find();

      const users = await db("users");
      console.log(users);
      expect(users).toEqual([]);
    });
  });

  describe("findById(id)", () => {
    it("Returns an object ", async () => {
      await Users.findById(1);

      const users = await db("users");
      console.log(users);
      expect(users).toEqual([]);
    });
  });
});
