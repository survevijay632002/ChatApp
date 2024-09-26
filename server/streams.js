import express from "express";
import status from "express-status-monitor";
import fs from "node:fs";
import zlib from "zlib";

const app = express();
const Port = 8080;
app.use(status());
app.use(express.json());

fs.createReadStream("./sample.txt").pipe(
  zlib.createGzip().pipe(fs.createWriteStream("./sample.zip"))
);

app.get("/", (req, res) => {
  const stream = fs.createReadStream("./sample.txt", "utf-8");
  stream.on("data", (chunk) => {
    res.write(chunk);
  });
  stream.on("end", () => res.end());
});

app.listen(Port, () => {
  console.log(`posrt is runnig on http://localhost:${Port}`);
});
