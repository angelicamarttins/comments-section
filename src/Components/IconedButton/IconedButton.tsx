import { ReactNode } from 'react'
import { ThemeColors, ThemeWeight } from '../../Types'
import { IconedButtonBase } from './IconedButton.styles'

type IconedButtonProps = {
	children: ReactNode
	icon: JSX.Element
	textColor?: ThemeColors
	textHover?: ThemeColors
	textWeight?: ThemeWeight
	onClick: () => void
}

export const IconedButton = ({
	children,
	icon,
	onClick,
	textColor,
	textHover,
	textWeight
}: IconedButtonProps) => (
	<IconedButtonBase
		onClick={onClick}
		textColor={textColor}
		textHover={textHover}
		textWeight={textWeight}
	>
		{icon}
		{children}
	</IconedButtonBase>
)
