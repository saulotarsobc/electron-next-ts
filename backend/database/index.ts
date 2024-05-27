import Database from "better-sqlite3";
import databasePath from "../utils/databasePath";
import { User } from "./schema";

const db = new Database(databasePath);

/**
 * Inserts a new user into the database and returns the newly inserted user.
 *
 * @param {User} user - The user object containing the name of the user to be inserted.
 * @return {User | undefined | unknown} - The newly inserted user if successful, undefined/unknown otherwise.
 */
export function addUser(user: User): Promise<User | undefined | unknown> {
  return new Promise((resolve, reject) => {
    try {
      const prepare = db.prepare("INSERT INTO users (name) VALUES (?)");
      const run = prepare.run(user.name);
      resolve(getUserById(run.lastInsertRowid as number));
    } catch (e) {
      console.error("ERROR IN addUser", e);
      reject(e);
    }
  });
}

/**
 * Retrieves all users from the database.
 *
 * @return {User[]  | unknown[]} An array of User objects representing all users in the database. If there are no users in the database, an empty array is returned.
 */
export function getUsers(): User[] | unknown[] {
  return db.prepare("SELECT * FROM users").all();
}

/**
 * Retrieves a user from the database based on the provided ID.
 *
 * @param {number} id - The ID of the user to retrieve.
 * @return {User | undefined | unknown} The user object if found, undefined/unknown otherwise.
 */
export function getUserById(id: number): User | undefined | unknown {
  return db.prepare("SELECT * FROM users WHERE id = ?").get(id);
}

/**
 * Initializes the database by creating a table for users if it does not already exist.
 *
 * @return {void} This function does not return anything.
 */
export function initDb(): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL
    )`);
}
