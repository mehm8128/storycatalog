import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

interface Component {
	name: string
	path: string
}

const app = new Hono()

// CORS設定 - port 5173（Vite開発サーバー）からのアクセスを許可
app.use(
	'/components',
	cors({
		origin: 'http://localhost:5173',
		allowMethods: ['GET'],
		allowHeaders: ['Content-Type', 'Authorization']
	})
)

app.get('/components', c => {
	try {
		const playgroundPath = join(process.cwd(), 'playground')

		// playgroundディレクトリの全ファイルを取得
		const files = readdirSync(playgroundPath)

		// .stories.tsxで終わるファイルのみをフィルタリング
		const tsxFiles = files.filter(file => file.endsWith('.stories.tsx'))

		const components: Component[] = tsxFiles.map(file => ({
			name: file.replace('.stories.tsx', ''),
			path: `${playgroundPath}/${file}`
		}))

		return c.json({
			success: true,
			components
		})
	} catch (error) {
		return c.json(
			{
				success: false,
				error: 'playgroundディレクトリの読み取りに失敗しました',
				details: error instanceof Error ? error.message : 'Unknown error'
			},
			500
		)
	}
})

serve(app)
