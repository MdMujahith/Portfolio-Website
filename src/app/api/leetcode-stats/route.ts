import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const revalidate = 3600;

export async function GET() {
  const username = "MdMujahith"; 

  try {
    const primaryResponse = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${username}`, {
      next: { revalidate: 3600 },
    });

    if (primaryResponse.ok) {
      const data = await primaryResponse.json();
      
      if (data.errors === undefined) {
        return NextResponse.json({
          totalSolved: data.totalSolved ?? 0,
          easySolved: data.easySolved ?? 0,
          mediumSolved: data.mediumSolved ?? 0,
          hardSolved: data.hardSolved ?? 0,
        });
      }
    }

    const fallbackResponse = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`, {
      next: { revalidate: 3600 },
    });

    if (fallbackResponse.ok) {
      const fallbackData = await fallbackResponse.json();
      return NextResponse.json({
        totalSolved: fallbackData.solvedProblem ?? 0,
        easySolved: fallbackData.easySolved ?? 0,
        mediumSolved: fallbackData.mediumSolved ?? 0,
        hardSolved: fallbackData.hardSolved ?? 0,
      });
    }

    throw new Error("Both LeetCode proxy APIs failed to respond.");

  } catch (error) {
    console.error("[leetcode-stats route] Error:", error);
    return NextResponse.json({ 
      totalSolved: 0, easySolved: 0, mediumSolved: 0, hardSolved: 0 
    }, { status: 200 });
  }
}