import { type ReactNode, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export function SuspenseWithErrorBoundary({
	children
}: {
	children: ReactNode
}) {
	return (
		<ErrorBoundary fallback={<div>error!</div>}>
			<Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
		</ErrorBoundary>
	)
}
