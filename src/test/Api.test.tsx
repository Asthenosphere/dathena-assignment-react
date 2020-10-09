import { getUsers } from "../services/userService";

it("get all users api", async () => {
  await expect(
    getUsers().then((response) => expect(Array.isArray(response)).toBe(true))
  );
});
