const serverless = require("serverless-http");
const express = require("express");
const app = express();
const $ = require("cheerio");
const fetch = require("node-fetch");

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});



app.get("/search", async (req, res, next) => {
  const { query, offset } = req.query;
  const url = `https://www.google.com/search?q=${query}&start=${offset}`;
  const headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
  };

  const response = await fetch(url, { headers: headers });
  const html = await response.text();
  const results = [];
  const $html = $.load(html);
  $html(".yuRUbf ").each((i, el) => {
    const link = $html(el).find("a").attr("href");
    const title = $html(el).find("h3").text();
    results.push({
      link,
      title,
    });
  });
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  res.json(results);
});


app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);


app.listen(8880, () => {
  console.log("Server is running on port 8880");
}
)