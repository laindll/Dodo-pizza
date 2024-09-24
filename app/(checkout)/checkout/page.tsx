import { CheckoutForm } from '@/components/shared'
import { Title } from '@/components/ui'
import { getUserSession } from '@/lib/getUserSession'
import { prisma } from '@/prisma/prisma-client'

export default async function ProductPage({}) {
	const session = await getUserSession()

	async function getUser() {
		try {
			const user = session
				? await prisma.user.findFirst({
						where: { id: Number(session?.id) },
				  })
				: undefined

			return user
		} catch (err) {
			console.log(err)
		}
	}

	const user = await getUser()

	return (
		<div className="mt-10">
			<Title className="font-extrabold mb-8 text-[32px]">
				Оформление заказа
			</Title>

			{user ? (
				<CheckoutForm className="pb-10" user={user} />
			) : (
				<CheckoutForm className="pb-10" />
			)}
		</div>
	)
}
