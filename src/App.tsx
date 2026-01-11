import { useEffect, useState } from 'react'
import styles from './App.module.css'
import { StoryRenderer } from './components/StoryRenderer/StoryRenderer'

interface Component {
	name: string
	path: string
}
interface ComponentList {
	components: Component[]
}

const fetchComponents = async () => {
	const res = await fetch('http://localhost:3000/components')
	const data: ComponentList = await res.json()
	return data
}

export default function App() {
	const [componentList, setComponentList] = useState<Component[]>([])
	const [selectedComponentPath, setSelectedComponentPath] = useState<
		string | null
	>(null)

	useEffect(() => {
		const getComponents = async () => {
			const components = await fetchComponents()
			setComponentList(components.components)
			setSelectedComponentPath(components.components[0]?.path ?? null)
		}
		getComponents()
	}, [])

	return (
		<main className={styles.module}>
			<h1>Story Catalog</h1>
			<section>
				<h2>Components</h2>
				<ul>
					{componentList.map(component => (
						<li key={component.path}>
							<button
								type="button"
								onClick={() => setSelectedComponentPath(component.path)}
							>
								{component.name}
							</button>
						</li>
					))}
				</ul>
			</section>
			{selectedComponentPath && (
				<StoryRenderer storyPath={selectedComponentPath} />
			)}
		</main>
	)
}
