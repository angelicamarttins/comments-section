import { ReactNode } from 'react'
import { ThemeColors, ThemeWeight } from '../../Types'
import { IconedButtonBase } from './IconedButton.styles'

type IconedButtonProps = {
	children: ReactNode
	icon: JSX.Element
	textColor?: ThemeColors
	textWeight?: ThemeWeight
	onClick: () => void
}

export const IconedButton = ({
	children,
	icon,
	onClick,
	textColor,
	textWeight
}: IconedButtonProps) => (
	<IconedButtonBase
		onClick={onClick}
		textColor={textColor}
		textWeight={textWeight}
	>
		{icon}
		{children}
	</IconedButtonBase>
)
