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
			<p>{id}</p>
			<p>{createdAt}</p>
			<p>{content}</p>
			<p>{score}</p>
      <img src={png} alt="Photo" />
		</>
	)
}
