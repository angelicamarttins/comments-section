export type CommentsType = {
	content: string
	createdAt: string
	id: string
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

export type Colors = {
	blueDark: string
	blueSoft: string
	grayDark: string
	grayLight: string
	grayMedium: string
	graySoft: string
	red: string
	redSoft: string
	white: string
}

type Fonts = {
	weight: Weight
	size: Size
}

type Weight = {
	regular: string
	medium: string
	bold: string
}

type Size = {
	regular: string
}

export type Theme = {
	colors: Colors
	fonts: Fonts
}
