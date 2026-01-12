import type { ChangeEvent } from 'react'

export default {
	props: {
		label: 'Enter text',
		onChange: (val: ChangeEvent<HTMLInputElement>) =>
			console.log('changed: ', val.target.value)
	}
}

export const Default = {
	props: {}
}
