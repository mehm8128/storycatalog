import type { ComponentProps } from 'react'

interface Props extends ComponentProps<'a'> {}

export default function Link({ children, href }: Props) {
	return <a href={href}>{children}</a>
}
