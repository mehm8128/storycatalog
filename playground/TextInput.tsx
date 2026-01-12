import type { ComponentProps } from 'react'

interface Props extends ComponentProps<'input'> {
	label: string
}

export default function TextInput({ value, label, onChange }: Props) {
	return (
		<div>
			<label>
				<span> {label}</span>
				<input type="text" value={value} onChange={onChange} />
			</label>
		</div>
	)
}
