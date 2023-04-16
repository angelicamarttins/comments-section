import styled, { ThemeProps, css } from 'styled-components'
import { Theme } from '../../Types'

type ScoreButtonThemeProps = {
	theme: Theme
	disabled: boolean
}

export const CommentWrapper = styled.div`
	${({ theme }: ThemeProps<Theme>) => css`
		display: grid;
		grid-template-rows: 40px 1fr;
		grid-template-columns: 50px 1fr;

		padding: 1rem;
		margin: 1rem 0;
		border-radius: 8px;

		background-color: ${theme.colors.white};
	`}
`

export const ReplyWrapper = styled.div`
	display: flex;
`

export const ReplyBar = styled.div`
	${({ theme }: ThemeProps<Theme>) => css`
		width: 5px;

		margin: 1.25rem 2.5rem;
		background-color: ${theme.colors.graySoft};
	`}
`

export const InfoLine = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	margin-left: 16px;

	grid-area: 1 / 2 / 1 / 2;
`

export const InfoWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	width: 45%;
`

export const CommentLine = styled.div`
	grid-area: 2 / 2 / 2 / 2;
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
	${({ theme, disabled }: ScoreButtonThemeProps) => css`
		border: none;

		background-color: transparent;

		font-weight: bold;
		cursor: pointer;

		:hover {
			fill: ${theme.colors.blueDark};
		}

		> svg {
			padding: 0.5rem;

			:hover path {
				fill: ${theme.colors.blueDark};
			}

			${disabled &&
			css`
				cursor: not-allowed;

				path {
					fill: ${theme.colors.graySoft};
				}

				:hover path {
					fill: ${theme.colors.graySoft};
				}
			`}
		}
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
export const MultiButton = styled.div`
	display: flex;
	gap: 1.5rem;
`

export const Chip = styled.span`
	${({ theme }: ThemeProps<Theme>) => css`
		padding: 0.1rem 0.25rem;

		border-radius: 2px;
		background-color: ${theme.colors.blueDark};
		color: ${theme.colors.white};

		font-size: ${theme.fonts.size.small};
		font-weight: ${theme.fonts.weight.medium};
	`}
`

export const Content = styled.p`
	margin: 10px 16px;
`
