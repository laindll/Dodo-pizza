import { AuthModal } from '@/components/shared'
import { CircleUser, User } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { Skeleton } from '../other/skeleton'
import { Button } from './button'

interface Props {
	className?: string
}

export const ProfileButton: React.FC<Props> = ({ className }) => {
	const { data: session } = useSession() || undefined

	return (
		<div className={className}>
			{session || session !== undefined ? (
				<>
					{!session ? (
						<AuthModal>
							<Button
								variant="outline"
								className="flex items-center gap-1 w-[120px]"
							>
								<User size={16} />
								Войти
							</Button>
						</AuthModal>
					) : (
						<Link href="/profile">
							<Button
								variant="secondary"
								className="flex items-center gap-2 w-30"
							>
								<CircleUser size={18} />
								Профиль
							</Button>
						</Link>
					)}
				</>
			) : (
				<Skeleton className="w-[120px] h-11 rounded-md" />
			)}
		</div>
	)
}
