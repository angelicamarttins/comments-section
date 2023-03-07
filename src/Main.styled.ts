import styled from 'styled-components'

const Background = styled.div`
	@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap');

	display: flex;
	justify-content: center;
	align-items: center;
	padding: 5rem;

	background-color: ${({ theme }) => theme.colors.grayLight};
	color: ${({ theme }) => theme.colors.grayMedium};

	font-family: 'Rubik', sans-serif;
	font-size: ${({ theme }) => theme.fonts.size.regular};
	font-weight: ${({ theme }) => theme.fonts.weight.regular};
`

export const Main = { Background }
