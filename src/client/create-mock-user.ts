import { User } from "@/common/user";

export const createMockUser = (email: string, displayName: string, uid: string): User => {
	return {
		email,
		displayName,
		uid,
		photoURL: '',
	}
}