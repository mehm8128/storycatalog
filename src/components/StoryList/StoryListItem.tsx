import { useSetAtom } from 'jotai'
import { type ComponentProps, use, useState } from 'react'
import type { ComponentInfo } from '../../repositories/fetchComponentInfo'
import { fetchStories } from '../../repositories/import/fetchStories'
import {
	selectedStoryAtom,
	selectedStoryFilePathAtom
} from '../../states/selectedStory'
import { SuspenseWithErrorBoundary } from '../SuspenseWithErrorBoundary/SuspenseWithErrorBoundary'
import styles from './StoryListItem.module.css'

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
		<li className={styles.componentItem}>
			<div className={styles.componentWrapper}>
				<button
					type="button"
					className={styles.componentButton}
					onClick={handleSelectComponent}
				>
					<span className={styles.componentName}>{component.name}</span>
					<span className={styles.toggleIcon}>{isOpen ? '▼' : '▶'}</span>
				</button>
				{isOpen && (
					<ul className={styles.storyList}>
						{storyList.map(story => (
							<li key={story.name} className={styles.storyItem}>
								<button
									type="button"
									className={styles.storyButton}
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
		<SuspenseWithErrorBoundary>
			<StoryListItemInner
				{...props}
				fetchStoriesPromise={fetchStoriesPromise}
			/>
		</SuspenseWithErrorBoundary>
	)
}
