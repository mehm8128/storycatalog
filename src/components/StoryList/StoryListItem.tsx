import { useSetAtom } from 'jotai'
import { type ComponentProps, Suspense, use, useState } from 'react'
import type { ComponentInfo } from '../../repositories/fetchComponentInfo'
import { fetchStories } from '../../repositories/import/fetchStories'
import {
	selectedStoryAtom,
	selectedStoryFilePathAtom
} from '../states/selectedStory'

export function StoryListItemInner({
	component,
	fetchStoriesPromise
}: ComponentProps<typeof StoryListItem> & {
	fetchStoriesPromise: ReturnType<typeof fetchStories>
}) {
	const setSelectStory = useSetAtom(selectedStoryAtom)
	const setSelectedStoryFilePath = useSetAtom(selectedStoryFilePathAtom)
	const storyList = Object.entries(use(fetchStoriesPromise).props).map(
		([key, value]) => ({ name: key, props: value })
	)
	const [isOpen, setIsOpen] = useState(false)

	const handleSelectComponent = () => {
		setIsOpen(!isOpen)
		setSelectedStoryFilePath(component.path)
		setSelectStory('Default')
	}

	const handleSelectStory = (storyName: string) => {
		setSelectedStoryFilePath(component.path)
		setSelectStory(storyName)
	}

	return (
		<li>
			<div>
				<button type="button" onClick={handleSelectComponent}>
					{component.name}
				</button>
				{isOpen && (
					<ul>
						{storyList.map(story => (
							<li key={story.name}>
								<button
									type="button"
									onClick={() => handleSelectStory(story.name)}
								>
									{story.name}
								</button>
							</li>
						))}
					</ul>
				)}
			</div>
		</li>
	)
}

export function StoryListItem(props: { component: ComponentInfo }) {
	const fetchStoriesPromise = fetchStories(props.component.path)

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<StoryListItemInner
				{...props}
				fetchStoriesPromise={fetchStoriesPromise}
			/>
		</Suspense>
	)
}
