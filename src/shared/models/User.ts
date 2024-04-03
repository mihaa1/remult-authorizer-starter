import { Allow, Entity, Fields } from 'remult'

@Entity<User>('users', {
	allowApiCrud: Allow.authenticated,
})
export class User {
	@Fields.cuid()
	id = ''

	@Fields.string()
	email = ''

	@Fields.createdAt({
		allowApiUpdate: false,
	})
	createdAt?: Date

	@Fields.updatedAt({
		allowApiUpdate: false,
	})
	updatedAt?: Date

	@Fields.string<User>({
		allowApiUpdate: false,
		// saving: (row, _fr, lc) => {
		// 	if (lc.isNew) {
		// 		row.createdBy = remult.user!.email
		// 	}
		// },
	})
	createdBy = ''

	@Fields.string<User>({
		allowApiUpdate: false,
		// saving: (row) => (row.updatedBy = remult.user!.email),
	})
	updatedBy = ''
}
