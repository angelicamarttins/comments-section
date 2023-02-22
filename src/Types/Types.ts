export type CommentsType = {
	content: string
	createdAt: string
	id?: string
	level: number
	originalScore: number
	replies?: CommentsType[]
	replyingTo?: string
	score: number
	user: UserType
}

export type UserType = {
	image: ImageType
	username: string
}

export type ImageType = {
	png: string
	webp: string
}

export type CommentsData = {
	currentUser: UserType
	comments: CommentsType[]
}

export type UpdatedProp = {
	content?: string
	score?: number
}
