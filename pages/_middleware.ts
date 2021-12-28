import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

//전역 middleware(모든 routes 실행)
/**
 * secret page의 auth 체크 미들웨어
 * @param req
 * @param ev
 * @returns
 */
export async function middleware(req: NextRequest, ev: NextFetchEvent) {
	/**
	 * 로그인O 체크 페이지
	 */
	if (req.nextUrl.pathname === "/admin/secret") {
		const session = await getToken({
			req,
			secret: process.env.JWT_SECRET as string,
			secureCookie:
				process.env.NEXTAUTH_URL?.startsWith("https://") ??
				!!process.env.VERCEL_URL,
		});

		// 권한이나 이름 체크등 session을 검증 로직추가 할 수 있다.
		if (!session) return NextResponse.redirect("/auth/login");
	}

	/**
	 * 로그인X 체크 페이지
	 */
	if (req.nextUrl.pathname === "/auth/login") {
		const session = await getToken({
			req,
			secret: process.env.JWT_SECRET as string,
			secureCookie:
				process.env.NEXTAUTH_URL?.startsWith("https://") ??
				!!process.env.VERCEL_URL,
		});

		if (session) return NextResponse.redirect("/admin/dashboard");
	}
}
