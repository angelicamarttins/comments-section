export type CommentsType = {
	level: number
  id?: string
	content: string
	createdAt: string
	score: number
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
