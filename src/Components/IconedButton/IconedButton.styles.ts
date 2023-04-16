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

		padding: 1rem 0;

		border: none;

		background-color: transparent;
		color: ${theme.colors[textColor || 'blueDark']};

		font-weight: ${theme.fonts.weight[textWeight || 'medium']};

		cursor: pointer;

		> svg {
			padding-right: 5px;
		}

		:hover,
		:hover path {
			color: ${theme.colors[textHover || 'blueSoft']};
			fill: ${theme.colors[textHover || 'blueSoft']};
		}
	`}
`
