import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./routes/index.js";
import path from "path";
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express();
const port = process.env.appPort || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json())
app.use(router)

app.use(express.static(path.join(__dirname,'../client/dist')))

app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`App running on port ${port}`)
});