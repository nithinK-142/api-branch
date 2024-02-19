import express, { json, Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";
import { handleFaviconRequest } from "./middleware/handleFaviconRequest";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3001;

config();

app.use(
  cors({
    origin: "*",
    methods: ["GET"],
  })
);

app.use(json());

app.use(handleFaviconRequest);

app.get("/:repo?/:owner?", async (req: Request, res: Response) => {
  const { repo, owner } = req.params;

  const selectedOwner = owner || "nithinK-142";
  const selectedRepo = repo || "nithin.me";
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${selectedOwner}/${selectedRepo}/branches`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    const branches = response.data.map(
      (branch: { name: string }) => branch.name
    );
    return res.json(branches);
  } catch (error) {
    console.error("Error fetching branches:", error);
    return res.status(500).json({ error: "Check username or branchname..." });
  }
});

app.listen(PORT, () => console.log("SERVER STARTED"));

export default app;
