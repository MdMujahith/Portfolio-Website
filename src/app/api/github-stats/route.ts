import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const revalidate = 3600;

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  try {
    const response = await fetch("https://api.github.com/users/MdMujahith", {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json",
          }
        : {
            Accept: "application/vnd.github+json",
          },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = (await response.json()) as {
      public_repos?: number;
      followers?: number;
    };

    return NextResponse.json({
      publicRepos: data.public_repos ?? 0,
      followers: data.followers ?? 0,
    });
  } catch {
    return NextResponse.json({ publicRepos: 0, followers: 0 }, { status: 200 });
  }
}
