import express from "express";
import cors from "cors";
import "dotenv/config";
import { corsOptions, limiter } from "./utils/utils";
import { handleFaviconRequest } from "./middleware/favicon.middleware";
import { BranchRouter } from "./routes";

const app = express();
const port = process.env.PORT || 3001;

// trust the vercel proxy
app.set("trust proxy", 1);

app.use(limiter);
app.use(cors(corsOptions));
app.use(express.json());
app.use(handleFaviconRequest);

app.use(BranchRouter);

app.listen(port, () => console.log(`⚙️ Server is Up and Running at ${port}`));

export default app;
