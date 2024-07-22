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
  res.setHeader("Access-Control-Max-Age", "86400"); // Cache preflight request for 1 day

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Create and start CORS Anywhere server
const corsServer = corsAnywhere.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: ["origin", "x-requested-with"],
  removeHeaders: ["cookie", "cookie2"],
  // Disable following redirects for preflight requests
  maxRedirects: 0,
});

app.use((req, res) => {
  corsServer.emit("request", req, res);
});

app.listen(process.env.PORT || 8080, "0.0.0.0", () => {
  console.log("CORS Anywhere server running");
});
