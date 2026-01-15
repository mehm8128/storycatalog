import axe from 'axe-core'
import { useAtomValue } from 'jotai'
import { use, useState } from 'react'
import { fetchComponent } from '../../repositories/import/fetchComponent'
import { fetchStories } from '../../repositories/import/fetchStories'
import {
	selectedStoryAtom,
	selectedStoryFilePathAtom
} from '../../states/selectedStory'
import { PropListItem } from '../PropListItem/PropListItem'
import { SuspenseWithErrorBoundary } from '../SuspenseWithErrorBoundary/SuspenseWithErrorBoundary'
import styles from './StoryRenderer.module.css'

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

	const handleAxe = async () => {
		axe.run(
			['#preview'],
			{
				runOnly: ['wcag2a', 'wcag2aa']
			},
			(err, results) => {
				if (err) {
					console.error(err)
				}
				console.log(results.passes)
				console.log(results.violations)
			}
		)
	}

	return (
		<div className={styles.module}>
			<section className={styles.componentSection} id="preview">
				{component ? component(propControls) : null}
			</section>
			<div>
				<button type="button" onClick={handleAxe}>
					axe
				</button>
			</div>
			<section className={styles.controls}>
				<ul className={styles.propsList}>
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
				</ul>
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
		<SuspenseWithErrorBoundary>
			<StoryContentInner
				key={selectedStory}
				selectedStory={selectedStory}
				fetchStoriesPromise={fetchStoriesPromise}
				fetchComponentPromise={fetchComponentPromise}
			/>
		</SuspenseWithErrorBoundary>
	)
}
