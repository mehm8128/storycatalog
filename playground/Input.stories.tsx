import type { ChangeEvent } from 'react'

export default {
	props: {
		onChange: (val: ChangeEvent<HTMLInputElement>) =>
			console.log('changed: ', val.target.value)
	}
}
