import { Router } from "express";
import { getRepoLinks } from "../controller/repoLinks.controller";

const router = Router();

router.get("/", (_req, res) => res.send("Branch Sentinel"));
router.get("/api/v1", getRepoLinks);

export { router as BranchRouter };
