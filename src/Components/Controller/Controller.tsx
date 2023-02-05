import { Container } from '../Container'
import { useController } from './useController'

export const Controller = () => {
	const { commentsData, onUpdate } = useController()

	return <Container commentsData={commentsData} onUpdate={onUpdate} />
}
