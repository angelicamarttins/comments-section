export type CommentsType = {
	level: number
	id?: string
	content: string
	createdAt: string
	score: number
	votes: string[]
	user: UserType
	replyingTo?: string
	replies?: CommentsType[]
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
