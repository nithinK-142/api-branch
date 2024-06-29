import { Router } from "express";
import { apiBranch } from "../controller/branch.controller";

const router = Router();

router.get("/api", apiBranch);

export { router as BranchRouter };
