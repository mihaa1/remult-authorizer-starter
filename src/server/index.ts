import express, { NextFunction, Request, Response } from 'express'
import { api } from './api'
const app = express()

app.get('/hello', (_req, res) => res.send('Hello World!'))

// fake auth middleware
app.use((req: Request, _res: Response, next: NextFunction) => {
	req.user = { ...req.user, id: '123', email: 'superman@marvel.com' }
	next()
})

app.use(api)

app.listen(process.env['PORT'] || 3002, () => console.log('Server started'))
