import { Suspense, use, useState } from 'react'
import { PropListItem } from '../PropListItem/PropListItem'

interface StorySetting {
	props: {
		// biome-ignore lint/suspicious/noExplicitAny: しかたない
		[key: string]: any
	}
}

const fetchStory = async (storyPath: string) => {
	const storySetting: StorySetting = (
		await import(/* @vite-ignore */ storyPath)
	).default
	const storyComponent = (
		await import(/* @vite-ignore */ storyPath.replace('.stories', ''))
	).default

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
	const [propControls, setPropControls] = useState(story.props)
	const propsList = Object.entries(propControls).map(([key, value]) => ({
		key,
		value
	}))

	return (
		<div>
			<section>
				<h2>Component</h2>
				{story.component ? story.component(propControls) : null}
			</section>
			<section>
				<h2>Props</h2>
				{propsList.map(({ key, value }) => (
					<PropListItem
						key={key}
						propKey={key}
						propValue={value}
						onChange={newValue =>
							setPropControls(prev => ({ ...prev, [key]: newValue }))
						}
					/>
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
