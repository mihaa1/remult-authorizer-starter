import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import { api } from './api'
import { Authorizer } from '@authorizerdev/authorizer-js'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'

const app = express()

app.use(cookieParser())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '../', '../', 'dist')))

// real auth
app.use(async (req: Request, res: Response, next: NextFunction) => {
	const authorization = req.cookies['cookie_session_domain']
	console.log('authorization', authorization)
	console.log('req.cookies', req.cookies)
	const authorizerRef = new Authorizer({
		// authorizerURL: 'http://localhost:8080',
		// redirectURL: 'http://localhost:3002',
		// // clientID: 'b0edf65f-3d16-4ed8-af0b-45a788709752',
		// clientID: 'b04ce106-f733-443b-8e82-412bb44aecb6',
		authorizerURL: process.env.VITE_AUTHORIZER_URL || '',
		redirectURL: process.env.AUTHORIZER_REDIRECT_URL || '',
		clientID: process.env.VITE_AUTHORIZER_CLIENT_ID || '',
	})
	const session = await authorizerRef.validateSession({
		cookie: authorization,
	})
	console.log('>>>> session.data', session?.data)
	session.data
	if (session) {
		return next()
	}
	res.status(403).send('Unauthorized MW')
})

app.get('/api/hello', (_req, res) => {
	// console.log('req.cookies', req.cookies)
	res.send('Hello World!')
})

// app.post('/api/current_user', (req, res) => {
// 	if (!req.body) {
// 		return res.status(401).json({
// 			message: 'Unauthorized',
// 		})
// 	}
// 	const data = req.body
// 	const accessToken = data?.access_token
// 	const expiresAt = data?.expires_in

// 	if (!accessToken || !expiresAt) {
// 		return res.status(401).json({
// 			message: 'Unauthorized',
// 		})
// 	}
// 	const now = new Date()
// 	now.setSeconds(now.getSeconds() + expiresAt)
// 	res.setHeader(
// 		'Set-Cookie',
// 		`authorizer_client=${accessToken};Expires=${now.toUTCString()};Secure=true;HttpOnly=true;Path=/`
// 	)
// 	res.status(200).json({ message: 'session created successfully' })
// })

// fake auth middleware
// app.use((req: Request, res: Response, next: NextFunction) => {
// 	// req.user = { ...req.user, id: '123', email: 'superman@marvel.com' }
// 	if (req.user) {
// 		return next()
// 	}
// 	res.status(403).send('Unauthorized')
// })

app.get('/hello-authenticated', (_req, res) => res.send('/hello-authenticated'))

app.use(api)

app.listen(process.env['PORT'] || 3002, () => console.log('Server started'))
