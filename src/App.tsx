import { useEffect, useState } from 'react'
import './App.css'
import {
	AuthorizerProvider,
	Authorizer,
	useAuthorizer,
} from '@authorizerdev/authorizer-react'
import { remult } from 'remult'
import { User } from './shared/models/User'

function App() {
	return (
		<AuthorizerProvider
			onStateChangeCallback={async ({ token }) => {
				console.log('token', token)
				if (!token) {
					return console.log('logged out...')
				}
				console.log('calling /api/current_user')
			}}
			config={{
				authorizerURL: import.meta.env.VITE_AUTHORIZER_URL,
				redirectURL: window.location.origin,
				clientID: import.meta.env.VITE_AUTHORIZER_CLIENT_ID,
			}}
		>
			<LoginSignup />
			<Profile />
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
	const [users, setUsers] = useState<User[]>([])
	const { user } = useAuthorizer()
	useEffect(() => {
		if (!user) {
			console.log('no user')
			return
		}
		fetchUsers()
	}, [user])

	const fetchUsers = async () => {
		try {
			const res = await remult.repo(User).find()
			setUsers(res)
		} catch (e) {
			console.log('Error fetching users', e)
		}
	}
	const createUser = async () => {
		await remult
			.repo(User)
			.save({ email: `something_${Math.floor(Math.random() * 10)}@demo.com` })
	}
	if (user) {
		return (
			<>
				Users:
				{users.map((u) => (
					<div key={u.email}>{u.email}</div>
				))}
				<div>Logged in :) Profile: {user.email}</div>
				<button onClick={createUser}>Create user</button>
			</>
		)
	}

	return null
}

export default App
