import { CommentsData } from '../Types'
import { useLocalStorage } from './useLocalStorage'

type useFindCommentProps = {
	index: number
	level: number
}

export function useFindComment({ index, level }: useFindCommentProps) {
	const { getLocalStorageValues } = useLocalStorage()

	const commensData = getLocalStorageValues<CommentsData>('commentsData')

	return level && index !== undefined
		? commensData?.comments?.[index].replies
		: commensData?.comments
}

/*
  Pensar em um modo de devolver todo o objeto do localStorage ao mesmo tempo que devolve o comentário que queremos manipular
*/
