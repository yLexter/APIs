import { initSequelize } from "./initSequelize";
import express from "express";

initSequelize();

const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
   console.log(`Server Running in: ${PORT}`);
});
