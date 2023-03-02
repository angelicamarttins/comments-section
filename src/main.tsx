import App from './App'
import { Main } from './Main.styled'
import { Normalize } from 'styled-normalize'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { theme } from './Utils'
const Root = () => (
	<ThemeProvider theme={theme}>
		<Main.Background>
			<Normalize />
			<App />
		</Main.Background>
	</ThemeProvider>
)
ReactDOM.createRoot(document.getElementById('root')!).render(<Root />)
