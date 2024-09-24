import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
	try {
		// const code = await req.nextUrl.searchParams.get('code')
		const code = ''

		if (!code) {
			return NextResponse.json({ error: 'Incorrect code' }, { status: 400 })
		}

		const verificationCode = await prisma.verificationCode.findFirst({
			where: {
				value: code,
			},
		})

		if (!verificationCode) {
			return NextResponse.json({ error: 'Incorrect code' }, { status: 400 })
		}

		await prisma.user.update({
			where: {
				id: verificationCode.userId,
			},
			data: {
				verified: true,
			},
		})

		await prisma.verificationCode.delete({
			where: {
				id: verificationCode.id,
			},
		})

		return NextResponse.redirect(new URL('/?verified', req.url))
	} catch (error) {
		console.error(error)
		console.log('[AUTH_VERIFY] Server error', error)
		return NextResponse.json({ error: 'Server error' }, { status: 500 })
	}
}
