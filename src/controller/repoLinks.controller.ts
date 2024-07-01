import { Request, Response } from "express";
import axios from "axios";
import { getProjectId } from "../utils/utils";
import {
  Branch,
  BranchInfo,
  VercelBranch,
  VercelDeploymentResponse,
} from "../utils/types";

async function fetchGithubBranches(repo: string): Promise<string[]> {
  try {
    const response = await axios.get<Branch[]>(
      `https://api.github.com/repos/nithinK-142/${repo}/branches`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    );
    return response.data.map((branch: Branch) => branch.name);
  } catch (error: any) {
    console.error("Error fetching GitHub branches:", error.message);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        console.log(`Repository '${repo}' not found.`);
        return [];
      }
      if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
        console.log(
          `Connection timeout while fetching branches for '${repo}'.`
        );
        return [];
      }
    }
    throw new Error(`Failed to fetch GitHub branch information for '${repo}'.`);
  }
}

async function fetchVercelBranches(
  projectId: string,
  repo: string
): Promise<VercelBranch[]> {
  try {
    const response = await axios.get<VercelDeploymentResponse>(
      "https://api.vercel.com/v6/deployments",
      {
        params: { projectId, limit: 100, until: Date.now() },
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
        },
      }
    );

    console.log(
      `Received ${response.data.deployments.length} deployments from Vercel API`
    );

    const cleanUrlRegex = new RegExp(
      `^${repo}-git-|-nithink(?:142s-projects|[-_]?142)\\.vercel\\.app$`,
      "g"
    );

    const vercelBranches = response.data.deployments
      .filter((deployment) => {
        if (
          !(
            deployment.meta &&
            deployment.meta.githubCommitRef &&
            deployment.meta.branchAlias
          )
        ) {
          console.log(
            "Skipping deployment due to missing properties:",
            JSON.stringify(deployment, null, 2)
          );
          return false;
        }
        return true;
      })
      .map((deployment) => ({
        branch: deployment.meta.githubCommitRef,
        url: deployment.meta.branchAlias.replace(cleanUrlRegex, ""),
      }));

    console.log(`Processed ${vercelBranches.length} valid deployments`);

    return [...new Set(vercelBranches.map((item) => JSON.stringify(item)))].map(
      (item) => JSON.parse(item)
    );
  } catch (error) {
    console.error("Error fetching Vercel branches:", error);
    if (axios.isAxiosError(error)) {
      console.error("Vercel API Error:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        projectId,
      });
      if (error.response?.status === 404) {
        return []; // Return an empty array if project is not found
      }
    }
    // return []; // Return an empty array for any other error
    throw new Error("Failed to fetch Vercel branch information.");
  }
}

function createResponseArray(
  branches: string[],
  vercelBranches: VercelBranch[]
): BranchInfo[] {
  return branches.map((branch) => {
    const vercelBranch = vercelBranches.find((vb) => vb.branch === branch);
    return {
      branchName: branch,
      vercelLink: vercelBranch ? vercelBranch.url : null,
    };
  });
}

export async function getRepoLinks(req: Request, res: Response) {
  const { repo = "nithin.me", links } = req.query;

  try {
    const githubBranches = await fetchGithubBranches(repo.toString());

    if (githubBranches.length === 0) {
      return res
        .status(404)
        .json({ error: "Repository not found or has no branches." });
    }

    if (!links) {
      return res.status(200).json(githubBranches);
    }

    const projectId = getProjectId(repo.toString());
    if (!projectId) {
      return res
        .status(404)
        .json({ error: "This repo has not yet been deployed to Vercel." });
    }

    const vercelBranches = await fetchVercelBranches(
      projectId,
      repo.toString()
    );

    const responseArray = createResponseArray(githubBranches, vercelBranches);

    return res.json(responseArray);
  } catch (error: any) {
    console.error("ERROR", error.message);
    return res.status(500).json({ error: error.message });
  }
}
