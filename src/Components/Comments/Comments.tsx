import { CommentsType } from '../../Types/Types'

export const Comments = ({
	content,
	createdAt,
	id,
	replies,
	score,
	user
}: CommentsType) => {
	const { image, username } = user
	const { png, webp } = image

	return (
		<>
			<img src={png} alt={`${username} photo`} />
			<p>{id}</p>
			<p>{createdAt}</p>
			<p>{content}</p>
			<p>{score}</p>
		</>
	)
}
