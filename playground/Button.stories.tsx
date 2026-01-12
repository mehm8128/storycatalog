export default {
	props: {
		children: 'Click me',
		color: 'lightblue',
		onClick: () => console.log('clicked!')
	}
}

export const Default = {
	props: {
		color: 'white'
	}
}

export const Red = {
	props: {
		color: 'red'
	}
}
