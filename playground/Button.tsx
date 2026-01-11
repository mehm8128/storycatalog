import type { ComponentProps } from 'react'

interface Props extends ComponentProps<'button'> {
	color: string
}

export default function Button({ children, color, onClick }: Props) {
	return (
		<button type="button" style={{ backgroundColor: color }} onClick={onClick}>
			{children}
		</button>
	)
}
