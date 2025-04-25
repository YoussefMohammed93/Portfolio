import { NextRequest, NextResponse } from "next/server";

// In Next.js 14+, params is a Promise
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ storageId: string }> }
) {
  try {
    // Await the params Promise
    const { storageId } = await context.params;

    if (!storageId) {
      return new NextResponse("Storage ID is required", { status: 400 });
    }

    const convexUrl = `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${storageId}`;

    const response = await fetch(convexUrl, {
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch image from Convex: ${response.status} ${response.statusText}`
      );
      return new NextResponse(
        `Failed to fetch image from Convex: ${response.status}`,
        {
          status: response.status,
        }
      );
    }

    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get("content-type") || "image/jpeg";

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return new NextResponse(
      `Error fetching image: ${error instanceof Error ? error.message : String(error)}`,
      {
        status: 500,
      }
    );
  }
}
