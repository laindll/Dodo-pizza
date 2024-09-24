import { cn } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button, Title } from '../ui'

interface Props {
	title: string
	text: string
	className?: string
	imageUrl?: string
}

export const InfoBlock: React.FC<Props> = ({
	className,
	title,
	text,
	imageUrl,
}) => {
	return (
		<div
			className={cn(
				className,
				'flex items-center justify-between w-[840px] gap-12'
			)}
		>
			<div className="flex flex-col">
				<div className="w-[445px]">
					<Title size="lg" className="font-extrabold mb-2">
						{title}
					</Title>
					<p className="text-gray-400 text-lg">{text}</p>
				</div>

				<div className="flex gap-5 mt-5">
					<Link href="/">
						<Button variant="outline" className="gap-2">
							<ArrowLeft />
							На главную
						</Button>
					</Link>
					<a href="">
						<Button
							variant="outline"
							className="text-gray-500 border-gray-400 hover:bg-gray-50"
						>
							Обновить
						</Button>
					</a>
				</div>
			</div>

			<Image src={imageUrl || ''} alt={title} width={300} height={300} />
		</div>
	)
}
