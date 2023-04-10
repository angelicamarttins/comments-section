import styled, { css } from 'styled-components'
import { Theme, ThemeColors, ThemeWeight } from '../../Types'

type IconedButtonThemeProps = {
	textColor?: ThemeColors
	textWeight?: ThemeWeight
	theme: Theme
	onClick: () => void
}

export const IconedButtonBase = styled.button`
	${({ theme, textColor, textWeight }: IconedButtonThemeProps) => css`
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 15%;

		padding: 1em;

		border: none;

		background-color: transparent;
		color: ${theme.colors[textColor || 'blueDark']};

		font-weight: ${theme.fonts.weight[textWeight || 'regular']};
		cursor: pointer;
	`}
`
