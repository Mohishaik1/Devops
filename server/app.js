import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 5600;
const app = express();
app.use(express.json());

const buildPath = path.join(__dirname, "build");
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

app.get("/api/test", (req,res)=>{
    res.json({msg:"Hello from /api/test!"})
});

app.use((req,res)=>{
    res.status(404).send("404 -not found")
});

app.use((err,req,res,next)=>{
        console.error(err.stack);
        res.status(500).send("500 - Internal server error")
});

app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`)
});
