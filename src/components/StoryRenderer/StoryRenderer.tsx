import { useAtomValue } from 'jotai'
import { Suspense, use, useState } from 'react'
import { fetchComponent } from '../../repositories/import/fetchComponent'
import { fetchStories } from '../../repositories/import/fetchStories'
import {
	selectedStoryAtom,
	selectedStoryFilePathAtom
} from '../../states/selectedStory'
import { PropListItem } from '../PropListItem/PropListItem'

function StoryContentInner({
	selectedStory,
	fetchStoriesPromise,
	fetchComponentPromise
}: {
	selectedStory: string | null
	fetchStoriesPromise: ReturnType<typeof fetchStories>
	fetchComponentPromise: ReturnType<typeof fetchComponent>
}) {
	const storyProps = use(fetchStoriesPromise).props
	const component = use(fetchComponentPromise)
	const [propControls, setPropControls] = useState(
		selectedStory ? storyProps[selectedStory] : {}
	)
	const propsList = Object.entries(propControls).map(([key, value]) => ({
		key,
		value
	}))

	return (
		<div>
			<section>
				<h2>Component</h2>
				<div>{component ? component(propControls) : null}</div>
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

export function StoryRenderer() {
	const selectedStory = useAtomValue(selectedStoryAtom)
	const selectedStoryFilePath = useAtomValue(selectedStoryFilePathAtom)

	if (!selectedStoryFilePath) {
		return
	}
	const fetchStoriesPromise = fetchStories(selectedStoryFilePath)
	const fetchComponentPromise = fetchComponent(selectedStoryFilePath)

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<StoryContentInner
				key={selectedStory}
				selectedStory={selectedStory}
				fetchStoriesPromise={fetchStoriesPromise}
				fetchComponentPromise={fetchComponentPromise}
			/>
		</Suspense>
	)
}
