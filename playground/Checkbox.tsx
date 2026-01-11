import type { ComponentProps } from 'react'

interface Props extends ComponentProps<'input'> {}

export default function Checkbox({ checked, onChange }: Props) {
	return <input type="checkbox" checked={checked} onChange={onChange} />
}
