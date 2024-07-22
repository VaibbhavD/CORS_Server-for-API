// server.js
const corsAnywhere = require("cors-anywhere");
const express = require("express");
const app = express();

// Handle preflight requests
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Create and start CORS Anywhere server
corsAnywhere
  .createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ["origin", "x-requested-with"],
    removeHeaders: ["cookie", "cookie2"],
    // Redirects are automatically followed by default
    // If you have specific needs, you can adjust the maxRedirects option here
    // maxRedirects: 5 // Optional: default is 5 redirects
  })
  .listen(process.env.PORT || 8080, "0.0.0.0", () => {
    console.log("CORS Anywhere server running");
  });
