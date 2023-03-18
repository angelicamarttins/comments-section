import styled from 'styled-components'

export const Wrapper = styled.div`
	background-color: ${({ theme }) => theme.colors.white};

	border-radius: 8px;

	padding: 1rem;
	margin: 1rem 0;

	display: grid;
	grid-template-rows: 100px 1fr;
	grid-template-columns: 100px 1fr;
`

export const InfoLine = styled.div`
	border: 1px solid;

	grid-area: 1 / 2 / 1 / 2;

	display: flex;
	justify-content: space-around;
	align-items: center;
`

export const CommentLine = styled.div`
	grid-area: 2 / 2 / 2 / 2;
  border: 1px solid red;
`

export const Score = styled.div`
  border: 1px solid greenyellow;

  /* grid-area: 1 / 1 / 2 / 1; */
  align-self: center;
`
