import express from "express";
import cors from "cors";
import "dotenv/config";
import { handleFaviconRequest } from "./middleware/handleFaviconRequest";
import { BranchRouter } from "./routes";

const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: "*",
    methods: ["GET"],
  })
);

app.use(express.json());
app.use(handleFaviconRequest);

app.use(BranchRouter);

app.listen(port, () => console.log("SERVER STARTED"));

export default app;
