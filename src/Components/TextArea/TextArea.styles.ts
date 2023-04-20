import styled, { ThemeProps, css } from 'styled-components'
import { Theme } from '../../Types'

export const TextAreaWrapper = styled.div`
	${({ theme }: ThemeProps<Theme>) => css`
		border: 1px solid;
		background-color: pink;
	`}
`

export const TextAreaInput = styled.textarea`
	${({ theme }: ThemeProps<Theme>) => css`
		border: 2px solid red;
	`}
`
