import { Dispatch, FormEvent, SetStateAction } from 'react'

import { useHandleComments } from '../../Hooks'
import { TextAreaInput, TextAreaWrapper } from './TextArea.styles'

type TextAreaProps = {
	buttonTitle: string
	initialValue: string
	onChange?: () => void
	onSubmit: (
		comment: string,
		event: FormEvent<HTMLFormElement>,
		handleComment?: Dispatch<SetStateAction<string>>
	) => void
}

export const TextArea = ({
	buttonTitle,
	initialValue,
	onChange,
	onSubmit
}: TextAreaProps) => {
	const { comment, handleComment } = useHandleComments(initialValue)

	return (
		<TextAreaWrapper>
			<form
				id="textarea"
				onSubmit={(event) => onSubmit(comment, event, handleComment)}
			>
				<TextAreaInput
					autoFocus
					onChange={({ target }) => onChange || handleComment(target.value)}
					value={comment}
				/>
				<button id="textarea" type="submit">
					{buttonTitle}
				</button>
			</form>
		</TextAreaWrapper>
	)
}
