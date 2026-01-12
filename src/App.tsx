import { Suspense } from 'react'
import styles from './App.module.css'
import { StoryList } from './components/StoryList/StoryList'
import { StoryRenderer } from './components/StoryRenderer/StoryRenderer'

export default function App() {
	return (
		<main className={styles.module}>
			<h1>Story Catalog</h1>
			<section>
				<h2>Components</h2>
				<Suspense fallback={<div>Loading...</div>}>
					<StoryList />
				</Suspense>
			</section>
			<Suspense fallback={<div>Loading...</div>}>
				<StoryRenderer />
			</Suspense>
		</main>
	)
}
