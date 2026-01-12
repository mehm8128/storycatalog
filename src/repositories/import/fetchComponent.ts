export const fetchComponent = async (storyPath: string) => {
	const storyComponent = (
		await import(/* @vite-ignore */ storyPath.replace('.stories', ''))
	).default

	return storyComponent
}
