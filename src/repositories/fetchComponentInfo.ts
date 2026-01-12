export interface ComponentInfo {
	name: string
	path: string
}
interface ComponentInfoList {
	components: ComponentInfo[]
}

export const fetchComponentInfo = async () => {
	const res = await fetch('http://localhost:3000/components')
	const data: ComponentInfoList = await res.json()
	return data
}
