export interface StorySetting {
	props: {
		// biome-ignore lint/suspicious/noExplicitAny: しかたない
		[key: string]: any
	}
}

export const fetchStories = async (storyPath: string) => {
	const storySettings: {
		default: StorySetting
		[key: string]: StorySetting
	} = await import(/* @vite-ignore */ storyPath)

	return {
		props: calculateStoryProps(storySettings)
	}
}

export const calculateStoryProps = (storySettings: {
	default: StorySetting
	[key: string]: StorySetting
}) => {
	const defaultProps = storySettings.default.props || {}
	const storyProps = Object.fromEntries(
		Object.entries(storySettings).flatMap(([key, setting]) => {
			if (key === 'default') return []
			return [
				[
					key,
					{
						...defaultProps,
						...setting.props
					}
				]
			]
		})
	)

	return storyProps
}
