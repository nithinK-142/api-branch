// rate limiter
import rateLimit from "express-rate-limit";
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: "Too many requests, please try again later.",
});

// cors options
import { CorsOptions } from "cors";
const allowedOrigins: string[] = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
  : [];

export const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (error: Error | null, allow?: boolean) => void
  ) => {
    if (allowedOrigins.indexOf(origin!) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// get projectid
import { Repo } from "./types";
export const getProjectId = (repo: string) => {
  const projectMap: Repo = {
    "react-guide": process.env.REACT_GUIDE_PROJECTID,
    "next-guide": process.env.NEXT_GUIDE_PROJECTID,
    "vue-guide": process.env.VUE_GUIDE_PROJECTID,
    "svelte-guide": process.env.SVELTE_GUIDE_PROJECTID,
    "node-guide": process.env.NODE_GUIDE_PROJECTID,
    "nithin.me": process.env.NITHIN_ME_PROJECTID,
  };

  return projectMap[repo] || null;
};
