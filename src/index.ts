import express from "express";
import cors from "cors";
import "dotenv/config";
import { corsOptions } from "./utils/utils";
import { handleFaviconRequest } from "./middleware/favicon.middleware";
import { BranchRouter } from "./routes";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors(corsOptions));
app.use(express.json());

app.use(handleFaviconRequest);
app.use(BranchRouter);

app.listen(port, () => console.log(`⚙️ Server is Up and Running at ${port}`));

export default app;
