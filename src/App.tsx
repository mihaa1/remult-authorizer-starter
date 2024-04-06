// import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import { remult } from 'remult'
// import { User } from './shared/models/User'
import {
	AuthorizerProvider,
	Authorizer,
	useAuthorizer,
} from '@authorizerdev/authorizer-react'
// import { Authorizer as AuthorizerJS } from '@authorizerdev/authorizer-js'

function App() {
	// const [users, setUsers] = useState<User[]>([])

	// useEffect(() => {
	// 	fetchUsers()
	// }, [])

	// const fetchUsers = async () => {
	// 	try {
	// 		const res = await remult.repo(User).find()
	// 		setUsers(res)
	// 	} catch (e) {
	// 		console.log('Error fetching users', e)
	// 	}
	// }
	const testReq = async () => {
		await fetch('/api/hello')
	}

	return (
		<AuthorizerProvider
			onStateChangeCallback={async ({ token }) => {
				console.log('token', token)
				if (!token) {
					return console.log('logged out...')
				}
				console.log('calling /api/current_user')
				// await fetch('/api/current_user', {
				// 	method: 'POST',
				// 	headers: {
				// 		'Content-Type': 'application/json',
				// 	},
				// 	body: JSON.stringify(token),
				// })
				// const authorizerJSRef = new AuthorizerJS({
				// 	authorizerURL: 'http://localhost:8080',
				// 	redirectURL: window.location.origin,
				// 	// clientID: 'b0edf65f-3d16-4ed8-af0b-45a788709752',
				// 	clientID: 'b04ce106-f733-443b-8e82-412bb44aecb6',
				// })
				// const session = await authorizerJSRef.validateSession()
				// console.log('token.access_token', token.access_token)
				// const profile = await authorizerJSRef.getProfile({
				// 	Authorization: `Bearer ${token.access_token}`,
				// })
				// console.log('>>>> session', session)
				// console.log('>>>> profile', profile)
			}}
			config={{
				// authorizerURL: 'https://authorizer-production-734e.up.railway.app',
				// authorizerURL: 'http://localhost:8080',
				// redirectURL: window.location.origin,
				// clientID: 'b0edf65f-3d16-4ed8-af0b-45a788709752', // obtain your client id from authorizer dashboard
				// extraHeaders: {}, // Optional JSON object to pass extra headers in each authorizer requests.
				authorizerURL: import.meta.env.VITE_AUTHORIZER_URL,
				redirectURL: window.location.origin,
				clientID: import.meta.env.VITE_AUTHORIZER_CLIENT_ID,
			}}
		>
			<LoginSignup />
			<Profile />
			<button onClick={testReq}>Fire</button>
		</AuthorizerProvider>
	)
}

const LoginSignup = () => {
	const { user } = useAuthorizer()

	if (user) {
		return null
	}

	return <Authorizer />
}

const Profile = () => {
	const { user } = useAuthorizer()

	if (user) {
		return <div>Logged in :) Profile: {user.email}</div>
	}

	return null
}

export default App
