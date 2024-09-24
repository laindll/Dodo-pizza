import React from 'react'
import { Checkbox } from '../../ui/input/checkbox'

export interface FilterCheckboxProps {
	text: string
	value: string
	endAdornment?: React.ReactNode
	onChange?: (checked: boolean) => void
	checked?: boolean
}

export const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
	text,
	value,
	endAdornment,
	onChange,
	checked,
}) => {
	return (
		<div className="flex items-center space-x-2">
			<Checkbox
				onCheckedChange={onChange}
				checked={checked}
				value={value}
				className="rounded-[8px] w-6 h-6"
				id={`checkbox-${String(value)}`}
			/>
			<label
				htmlFor={`checkbox-${String(value)}`}
				className="leading-none cursor-pointer flex-1 select-none"
			>
				{text}
			</label>
			{endAdornment}
		</div>
	)
}
