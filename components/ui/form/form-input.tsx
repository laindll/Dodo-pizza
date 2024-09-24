'use client'

import { useFormContext } from 'react-hook-form'
import { ClearButton } from '../button/clear-button'
import { Input } from '../input/input'
import { ErrorText } from './error-text'
import { RequiredSymbol } from './required-symbol'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string
	label?: string
	required?: boolean
	className?: string
}

export const FormInput: React.FC<Props> = ({
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
			{label && (
				<p className="font-semibold mb-2">
					{label} {required && <RequiredSymbol />}
				</p>
			)}

			<div className="relative">
				<Input className="h-11 text-md" {...register(name)} {...props} />

				{value && (
					<ClearButton
						onClick={() => setValue(name, '', { shouldValidate: true })}
					/>
				)}
			</div>

			<ErrorText text={errorText || 'ㅤ'} className="mt-2" />
		</div>
	)
}
