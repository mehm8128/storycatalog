import { atom } from 'jotai'
import { fetchComponentInfo } from '../../repositories/fetchComponentInfo'

export const componentInfoAtom = atom(async () => {
	const componentInfo = await fetchComponentInfo()
	return componentInfo.components
})
