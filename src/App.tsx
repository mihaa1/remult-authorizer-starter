import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { remult } from 'remult'
import { User } from './shared/models/User'

function App() {
	const [users, setUsers] = useState<User[]>([])

	useEffect(() => {
		fetchUsers()
	}, [])

	const fetchUsers = async () => {
		try {
			const res = await remult.repo(User).find()
			setUsers(res)
		} catch (e) {
			console.log('Error fetching users', e)
		}
	}

	return (
		<>
			{users.map((u) => (
				<div>{u.email}</div>
			))}
		</>
	)
}

export default App
