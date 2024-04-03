declare global {
	namespace Express {
		export interface Request {
			user?: Pick<User, 'id' | 'email'>
		}
	}
}

export {}
declare module 'remult' {
	export interface UserInfo {
		email: string
	}
}
