import styles from './App.module.css'
import { StoryList } from './components/StoryList/StoryList'
import { StoryRenderer } from './components/StoryRenderer/StoryRenderer'
import { SuspenseWithErrorBoundary } from './components/SuspenseWithErrorBoundary/SuspenseWithErrorBoundary'

export default function App() {
	return (
		<main className={styles.module}>
			<h1>Story Catalog</h1>
			<section>
				<h2>Components</h2>
				<SuspenseWithErrorBoundary>
					<StoryList />
				</SuspenseWithErrorBoundary>
			</section>
			<SuspenseWithErrorBoundary>
				<StoryRenderer />
			</SuspenseWithErrorBoundary>
		</main>
	)
}
