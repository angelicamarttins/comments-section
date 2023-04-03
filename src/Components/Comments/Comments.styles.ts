import styled from 'styled-components'

export const Wrapper = styled.div`
	display: grid;
	grid-template-rows: 50px 1fr;
	grid-template-columns: 50px 1fr;

	padding: 1rem;
	margin: 1rem 0;
	border-radius: 8px;

	background-color: ${({ theme }) => theme.colors.white};
`

export const InfoLine = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	grid-area: 1 / 2 / 1 / 2;

	border: 1px solid;
`

export const InfoWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	width: 45%;
`

export const CommentLine = styled.div`
	grid-area: 2 / 2 / 2 / 2;

	border: 1px solid red;
`

export const ScoreWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	grid-area: 1 / 1 / 3 / 1;
	align-self: center;

	width: 40px;
	height: 100px;
	padding: 0.5rem 0;
	border-radius: 10px;

	background-color: ${({ theme }) => theme.colors.grayLight};
`

export const ScoreButton = styled.button`
	width: 100%;
	height: 100%;
	padding: 0.35rem 0;
	border: none;

	background-color: transparent;
	color: ${({ theme }) => theme.colors.blueSoft};

	font-weight: bold;
	cursor: pointer;

	:hover {
		color: ${({ theme }) => theme.colors.blueDark};
	}
`

export const ScoreCount = styled.p`
	color: ${({ theme }) => theme.colors.blueDark};

	font-weight: ${({ theme }) => theme.fonts.weight.bold};
`

export const Image = styled.img`
	width: 32px;
	height: 32px;
`
export const UserName = styled.h1`
	color: ${({ theme }) => theme.colors.grayDark};

	font-size: ${({ theme }) => theme.fonts.size.regular};
`
