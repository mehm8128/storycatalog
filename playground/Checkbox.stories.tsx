import type { ChangeEvent } from 'react'

export default {
	props: {
		checked: true,
		onChange: (val: ChangeEvent<HTMLInputElement>) =>
			console.log('changed: ', val.target.value)
	}
}
