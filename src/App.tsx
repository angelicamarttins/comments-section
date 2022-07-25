import { useEffect, useState } from 'react'
import { Data } from './Types/Types'

function App() {
	const [data, setData] = useState<Data>()
	const [idCount, setIdCount] = useState(4)
	const [newComments, setNewComments] = useState('')
	const [replyComments, setReplyComments] = useState('')
	const [showReplyForm, setShowReplyForm] = useState(0)
	const [update, setUpdate] = useState(false)

	useEffect(() => {
		const getLocalStorage = window.localStorage.getItem('data')
		if (getLocalStorage) return setData(JSON.parse(getLocalStorage))
		fetch('data.json')
			.then((res) => res.json())
			.then((data) => {
				setData(data)
				window.localStorage.setItem('data', JSON.stringify(data))
			})
	}, [])

	function handleChangeNewComments({ target }) {
		console.log(newComments)
		setNewComments(target.value)
	}

	function handleChangeReplyComments({ target }) {
		console.log(replyComments)
		setReplyComments(target.value)
	}

	function handleSend(event) {
		event.preventDefault()
		setIdCount(idCount + 1)
		const newComment = {
			id: idCount,
			content: newComments,
			createdAt: 'Today',
			score: 0,
			user: {
				image: {
					png: './images/avatars/image-juliusomo.png',
					webp: './images/avatars/image-juliusomo.webp'
				},
				username: 'juliusomo'
			}
		}

		data?.comments.push(newComment)
		window.localStorage.setItem('data', JSON.stringify(data))
		console.log(data)
		setNewComments('')
	}

	function handleReply(id: number) {
		console.log(id)
		setShowReplyForm(id)
	}

	function handleUpdate(id: number) {
		data?.comments.map((comment) => {
			if (comment.id === id) {
				setUpdate(true)
				setReplyComments(comment.content)
				console.log('dentro do if')
			}
			console.log('fora do if')
			setUpdate(false)
			setReplyComments('')
		})
	}

	function handleReplyComment(event: any, id: number, username: string) {
		event.preventDefault()
		setIdCount(idCount + 1)
		const newReply = {
			id: idCount,
			content: replyComments,
			createdAt: 'Today',
			score: 0,
			replyingTo: username,
			user: {
				image: {
					png: './images/avatars/image-juliusomo.png',
					webp: './images/avatars/image-juliusomo.webp'
				},
				username: 'juliusomo'
			}
		}

		data?.comments.map((comment) =>
			comment.id === id ? comment.replies?.push(newReply) : ''
		)
		window.localStorage.setItem('data', JSON.stringify(data))
		console.dir(data)
		setReplyComments('')
	}

	return (
		<>
			{data &&
				data?.comments.map(({ id, content, replies, user }) => {
					const { username } = user
					return (
						<>
							{update ? (
								<>
									<label htmlFor="content"></label>
									<textarea
										id="content"
										value={replyComments}
										onChange={handleChangeNewComments}
									/>
								</>
							) : (
								<>
									<p>{id}</p>
									<p>{username}</p>
									<p>{content}</p>
									<button onClick={() => handleReply(id)}>Reply</button>{' '}
									<button onClick={() => handleUpdate(id)}>Update</button>
								</>
							)}

							{showReplyForm === id && (
								<>
									{' '}
									<form style={{ paddingTop: '2rem' }}>
										<label htmlFor="content">Escreva seu comentário</label>
										<textarea
											id="content"
											value={replyComments}
											onChange={handleChangeReplyComments}
										/>
										<button
											onClick={() => handleReplyComment(event, id, username)}
										>
											Reply Comment
										</button>
										<br />
										<button onClick={() => handleReply(id)}>Reply</button>
									</form>
								</>
							)}
							{replies
								? replies?.map(({ id, content, replies, username }) => {
										return (
											<div style={{ paddingLeft: '2rem' }}>
												<p>{id}</p>
												<p>{content}</p>
												<button onClick={() => handleReply(id)}>Reply</button>

												{showReplyForm === id && (
													<>
														{' '}
														<form style={{ paddingTop: '2rem' }}>
															<label htmlFor="content"></label>
															<textarea
																id="content"
																value={replyComments}
																onChange={handleChangeReplyComments}
															/>
															<button
																onClick={() =>
																	handleReplyComment(event, id, username)
																}
															>
																Reply Comment
															</button>
															<br />
															<button onClick={() => handleReply(id)}>
																Reply
															</button>
														</form>
													</>
												)}
											</div>
										)
								  })
								: ''}
						</>
					)
				})}
			<form onSubmit={handleSend} style={{ paddingTop: '2rem' }}>
				<label htmlFor="content"></label>
				<textarea
					id="content"
					value={newComments}
					onChange={handleChangeNewComments}
				/>
				<button>Send</button>
				<p>Testing ssh key</p>
			</form>
		</>
	)
}

export default App
