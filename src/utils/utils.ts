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
