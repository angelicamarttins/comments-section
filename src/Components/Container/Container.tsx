import { Dispatch, SetStateAction } from 'react'

import { Comments } from '../Comments'
import { CommentsData } from '../../Types'
import { NewComment } from '../NewComment'

type containerProps = {
	commentsData?: CommentsData
}

export const Container = ({ commentsData }: containerProps) => {
	return (
		<>
			{commentsData?.comments.map((comment, index) => {
				return <Comments key={comment.id} index={index} {...comment} />
			})}
			<NewComment />
		</>
	)
}
