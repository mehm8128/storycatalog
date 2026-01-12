import styles from './App.module.css'
import { StoryList } from './components/StoryList/StoryList'
import { StoryRenderer } from './components/StoryRenderer/StoryRenderer'
import { SuspenseWithErrorBoundary } from './components/SuspenseWithErrorBoundary/SuspenseWithErrorBoundary'

export default function App() {
	return (
		<div className={styles.module}>
			<aside className={styles.sidebar}>
				<h1>Story Catalog</h1>
				<section>
					<SuspenseWithErrorBoundary>
						<StoryList />
					</SuspenseWithErrorBoundary>
				</section>
			</aside>
			<main className={styles.main}>
				<SuspenseWithErrorBoundary>
					<StoryRenderer />
				</SuspenseWithErrorBoundary>
			</main>
		</div>
	)
}
