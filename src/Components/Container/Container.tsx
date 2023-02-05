import { Dispatch, SetStateAction } from 'react'

import { Comments } from '../Comments'
import { CommentsData } from '../../Types'
import { NewComment } from '../NewComment'

type containerProps = {
	commentsData?: CommentsData
	onUpdate: Dispatch<SetStateAction<boolean>>
}

export const Container = ({ commentsData, onUpdate }: containerProps) => {
	return (
		<>
			{commentsData?.comments.map((comment, index) => {
				return (
					<Comments
						key={comment.id}
						index={index}
						onUpdate={onUpdate}
						{...comment}
					/>
				)
			})}
			<NewComment onUpdate={onUpdate} />
		</>
	)
}
