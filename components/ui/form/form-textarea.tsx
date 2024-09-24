'use client'

import { useFormContext } from 'react-hook-form'
import { ClearButton } from '../button/clear-button'
import { Textarea } from '../input/textarea'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	className?: string
	name: string
	label?: string
	required?: boolean
}

export const FormTextarea: React.FC<Props> = ({
	className,
	name,
	label,
	required,
	...props
}) => {
	const {
		register,
		formState: { errors },
		watch,
		setValue,
	} = useFormContext()

	const value = watch(name)
	const errorText = errors[name]?.message as string

	return (
		<div className={className}>
			<p className="font-medium mb-2">
				{label} {required && <span className="text-red-500">*</span>}
			</p>

			<div className="relative">
				<Textarea className="h-12 text-md" {...register(name)} {...props} />

				{value && (
					<ClearButton
						onClick={() => setValue(name, '', { shouldValidate: true })}
						className="top-6"
					/>
				)}
			</div>

			{errorText && <p className="text-red-500 text-sm mt-2">{errorText}</p>}
		</div>
	)
}
