import { useAtomValue } from 'jotai'
import { componentInfoAtom } from '../../states/componentInfo'
import { StoryListItem } from './StoryListItem'

export function StoryList() {
	const componentInfoList = useAtomValue(componentInfoAtom)

	return (
		<ul>
			{componentInfoList.map(component => (
				<StoryListItem key={component.path} component={component} />
			))}
		</ul>
	)
}
