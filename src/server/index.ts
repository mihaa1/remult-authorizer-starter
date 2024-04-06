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
	const authorizerRef = new Authorizer({
		authorizerURL: process.env.VITE_AUTHORIZER_URL || '',
		redirectURL: process.env.AUTHORIZER_REDIRECT_URL || '',
		clientID: process.env.VITE_AUTHORIZER_CLIENT_ID || '',
	})
	const session = await authorizerRef.validateSession({
		cookie: authorization,
	})
	session.data
	if (session) {
		return next()
	}
	res.status(403).send('Unauthorized MW')
})

app.get('/api/hello', (_req, res) => res.send('Hello World!'))

app.get('/hello-authenticated', (_req, res) => res.send('/hello-authenticated'))

app.use(api)

app.listen(process.env['PORT'] || 3002, () => console.log('Server started'))
