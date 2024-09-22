import { IdTokenResult, User } from "firebase/auth";

export const createMockUser = (email: string, displayName: string, uid: string): User => ({
	email,
	displayName,
	uid,
	emailVerified: true,
	isAnonymous: false,
	providerId: 'google.com',
	metadata: {},
	providerData: [{
		providerId: 'google.com',
		displayName,
		email,
		phoneNumber: null,
		photoURL: null,
		uid
	}],
	phoneNumber: null,
	photoURL: null,
	refreshToken: '',
	tenantId: null,
	delete: async () => {},
	getIdToken: async () => '',
	getIdTokenResult: async () => ({} as IdTokenResult),
	reload: async () => {},
	toJSON: () => ({}),
});