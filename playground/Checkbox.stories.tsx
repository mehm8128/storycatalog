import type { ChangeEvent } from 'react'

export default {
	props: {
		checked: true,
		onChange: (val: ChangeEvent<HTMLInputElement>) =>
			console.log('changed: ', val.target.value)
	}
}

export const Default = {
	props: {
		checked: false
	}
}

export const Checked = {
	props: {
		checked: true
	}
}
