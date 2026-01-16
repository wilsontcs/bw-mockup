import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Step 1: Read JSON body
    const body = await request.json();

    if (!body?.locale || typeof body.locale !== "string") {
      console.error("Invalid locale format:", body);

      return NextResponse.json(
        { error: "Invalid locale format" },
        { status: 400 },
      );
    }

    // Step 2: Set the cookie
    const response = NextResponse.json({
      success: true,
      message: "Locale set",
    });

    // Set the cookie (ensure this works)
    response.cookies.set("NEXT_LOCALE", body.locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year expiration
    });

    return response;
  } catch (error: unknown) {
    console.error("Error in /api/set-locale:", error);

    let message = "Internal server error";
    if (error instanceof Error) {
      message = `Internal server error: ${error.message}`;
    }

    return NextResponse.json(
      { error: message },
      { status: 500 },
    );
  }
}
