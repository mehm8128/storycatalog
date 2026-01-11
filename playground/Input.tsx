import type { ComponentProps } from 'react'

interface Props extends ComponentProps<'input'> {}

export default function Input({ value, onChange }: Props) {
	return <input value={value} onChange={onChange} />
}
