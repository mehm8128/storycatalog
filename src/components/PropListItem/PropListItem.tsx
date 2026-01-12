import styles from './PropListItem.module.css'

interface Props<T> {
	propKey: string
	propValue: T
	onChange: (newValue: T) => void
}

export function PropListItem<T>({ propKey, propValue, onChange }: Props<T>) {
	return (
		<li className={styles.propItem}>
			{/* biome-ignore lint/a11y/noLabelWithoutControl: 大丈夫 */}
			<label className={styles.propLabel}>
				<span className={styles.propKey}>{propKey}</span>
				<span className={styles.propInputWrapper}>
					<PropListInputFactory propValue={propValue} onChange={onChange} />
				</span>
			</label>
		</li>
	)
}

function PropListInputFactory<T>({
	propValue,
	onChange
}: {
	propValue: T
	// biome-ignore lint/suspicious/noExplicitAny: わからん
	onChange: (newValue: any) => void
}) {
	switch (typeof propValue) {
		case 'string':
			return (
				<input
					type="text"
					value={propValue}
					onChange={e => onChange(e.target.value)}
				/>
			)
		case 'number':
			return (
				<input
					type="number"
					value={propValue}
					onChange={e => onChange(Number(e.target.value))}
				/>
			)
		case 'boolean':
			return (
				<input
					type="checkbox"
					checked={propValue as unknown as boolean}
					onChange={e => onChange(e.target.checked as unknown as T)}
				/>
			)
		default:
			return <div>{JSON.stringify(propValue)}</div>
	}
}
