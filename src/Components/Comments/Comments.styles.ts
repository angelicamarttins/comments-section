import styled, { ThemeProps, css } from 'styled-components'
import { Theme } from '../../Types'

type ScoreButtonProps = {
	theme: Theme
	disabled: boolean
}

export const Wrapper = styled.div`
	${({ theme }: ThemeProps<Theme>) => css`
		display: grid;
		grid-template-rows: 50px 1fr;
		grid-template-columns: 50px 1fr;

		padding: 1rem;
		margin: 1rem 0;
		border-radius: 8px;

		background-color: ${theme.colors.white};
	`}
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
	${({ theme }: ThemeProps<Theme>) => css`
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

		background-color: ${theme.colors.grayLight};
	`}
`

export const ScoreButton = styled.button`
	${({ theme, disabled }: ScoreButtonProps) => css`
		width: 100%;
		height: 100%;
		padding: 0.35rem 0;
		border: none;

		background-color: transparent;
		color: ${theme.colors.blueSoft};

		font-weight: bold;
		cursor: pointer;

		:hover {
			color: ${theme.colors.blueDark};
		}

		${disabled &&
		css`
			color: ${theme.colors.graySoft};

			:hover {
				color: transparent;
				cursor: not-allowed;
			}
		`}
	`}
`

export const ScoreCount = styled.p`
	${({ theme }: ThemeProps<Theme>) => css`
		color: ${theme.colors.blueDark};

		font-weight: ${theme.fonts.weight.bold};
	`}
`

export const Image = styled.img`
	width: 32px;
	height: 32px;
`
export const UserName = styled.h1`
	${({ theme }: ThemeProps<Theme>) => css`
		color: ${theme.colors.grayDark};

		font-size: ${theme.fonts.size.regular};
	`}
`

export const ReplyButton = styled.div`
	${({ theme }: ThemeProps<Theme>) => css`
		> button {
			border: none;

			background-color: transparent;

			color: ${theme.colors.blueDark};
			font-weight: ${theme.fonts.weight.bold};

			cursor: pointer;
		}
	`}
`
