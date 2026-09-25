import test from "node:test";
import assert from "node:assert";
import { buildApp } from "../app.js";

test("GET / responds with a page", async () => {
  const app = await buildApp();

  const response = await app.inject({
    method: "GET",
    url: "/",
  });

  assert.strictEqual(response.statusCode, 200);
  assert.match(response.body, /<h1>QuoteBoard<\/h1>/);
});

test("POST /quotes adds a new quote and redirects", async () => {
  const app = await buildApp();

  const response = await app.inject({
    method: "POST",
    url: "/quotes",
    payload: {
      author: "John Doe",
      text: "This is a test quote.",
    },
  });

  // Check that the quote was added to the database
  const result = await app.pg.query(
    "SELECT * FROM quotes WHERE author = $1 AND text = $2",
    ["John Doe", "This is a test quote."],
  );

  assert.strictEqual(result.rowCount, 1);

  await app.pg.query("DELETE FROM quotes WHERE author = $1 AND text = $2", [
    "John Doe",
    "This is a test quote.",
  ]);

  assert.strictEqual(response.statusCode, 302);
  assert.strictEqual(response.headers["location"], "/");
});

test("GET /health responds with ok", async () => {
  const app = await buildApp();

  const response = await app.inject({
    method: "GET",
    url: "/health",
  });

  assert.strictEqual(response.statusCode, 200);
  assert.deepStrictEqual(JSON.parse(response.body), { ok: true });
});

test("GET /quotes returns quotes from the database", async () => {
  const app = await buildApp();

  // Insert a test quote into the database
  await app.pg.query("INSERT INTO quotes (author, text) VALUES ($1, $2)", [
    "Test Author",
    "This is a test quote from the databasee.",
  ]);

  const response = await app.inject({
    method: "GET",
    url: "/",
  });

  await app.pg.query("DELETE FROM quotes WHERE author = $1 AND text = $2", [
    "Test Author",
    "This is a test quote from the databasee.",
  ]);

  assert.strictEqual(response.statusCode, 200);
  assert.match(response.body, /This is a test quote from the databasee./);
});
