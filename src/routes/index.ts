import express, { Router } from "express";
import { getRepoLinks } from "../controller/repoLinks.controller";
import path from "path";

const router = Router();

router.use("/", express.static(path.join(__dirname, "../../public/out")));

router.get("/api/v1", getRepoLinks);

export { router as BranchRouter };
