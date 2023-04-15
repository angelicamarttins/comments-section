import styled, { css } from 'styled-components'
import { Theme, ThemeColors, ThemeWeight } from '../../Types'

type IconedButtonThemeProps = {
	textColor?: ThemeColors
	textHover?: ThemeColors
	textWeight?: ThemeWeight
	theme: Theme
	onClick: () => void
}

export const IconedButtonBase = styled.button`
	${({
		theme,
		textColor,
		textHover,
		textWeight
	}: IconedButtonThemeProps) => css`
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		width: 95px;

		padding: 1em;

		border: none;

		background-color: transparent;
		color: ${theme.colors[textColor || 'blueDark']};

		font-weight: ${theme.fonts.weight[textWeight || 'regular']};

		cursor: pointer;

		:hover {
			color: ${theme.colors[textHover || 'blueSoft']};
		}

		:hover path {
			fill: ${theme.colors[textHover || 'blueSoft']};
		}
	`}
`
