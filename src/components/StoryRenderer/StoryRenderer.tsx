import { Suspense, use } from 'react'

interface StorySetting {
	props: {
		// biome-ignore lint/suspicious/noExplicitAny: しかたない
		[key: string]: any
	}
}

const fetchStory = async (storyPath: string) => {
	const storySetting: StorySetting = (await import(`/${storyPath}`)).default
	const storyComponent = (await import(`/${storyPath.replace('.stories', '')}`))
		.default
	return {
		component: storyComponent,
		props: storySetting.props
	}
}

function StoryContent({
	fetchStoryPromise
}: {
	fetchStoryPromise: ReturnType<typeof fetchStory>
}) {
	const story = use(fetchStoryPromise)
	const propsList = Object.entries(story.props).map(([key, value]) => ({
		key,
		value
	}))

	return (
		<div>
			<section>
				<h2>Component</h2>
				{story.component ? story.component(story.props) : null}
			</section>
			<section>
				<h2>Props</h2>
				{propsList.map(({ key, value }) => (
					<div key={key}>
						{key}: {String(value)}
					</div>
				))}
			</section>
		</div>
	)
}

export function StoryRenderer({ storyPath }: { storyPath: string }) {
	const fetchStoryPromise = fetchStory(storyPath)

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<StoryContent fetchStoryPromise={fetchStoryPromise} />
		</Suspense>
	)
}
