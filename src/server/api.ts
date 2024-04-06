/* eslint-disable @typescript-eslint/ban-ts-comment */
import { remultExpress } from 'remult/remult-express'
import { User } from '../shared/models/User'

export const api = remultExpress({
	entities: [User],
	getUser: async (req) => {
		return {
			// @ts-ignore
			id: req.user?.id,
			// @ts-ignore
			email: req.user?.email,
		}
	},
})
