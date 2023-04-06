import { ReactNode } from 'react'
import { Colors } from '../../Types'

type IconnedButtonProps = {
	children: ReactNode
	icon: SVGElement
	iconColor: Colors
  onClick: () => void
}

export const IconnedButton = ({
	children,
	icon,
	iconColor
}: IconnedButtonProps) => {
	console.log({ children, icon, iconColor })
}
