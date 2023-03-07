import { Comments } from '../Comments'
import { CommentsData } from '../../Types'
import { NewComment } from '../NewComment'
import { Styled } from './Container.styles'

type ContainerProps = {
	commentsData?: CommentsData
	onUpdate: () => void
}

export const Container = ({ commentsData, onUpdate }: ContainerProps) => (
	<>
		{commentsData?.comments?.map((comment, index) => {
			return (
				<Styled.Wrapper>
					<Comments
						key={comment.id}
						index={index}
						onUpdate={onUpdate}
						currentUser={commentsData.currentUser}
						{...comment}
					/>
				</Styled.Wrapper>
			)
		})}
		<NewComment onUpdate={onUpdate} />
	</>
)
