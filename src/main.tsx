import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import './styles/index.css'
import { ThemeProvider } from './components/ui/providers/theme-provider'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider defaultTheme='dark'>
		<App />
		</ThemeProvider>
		
	</React.StrictMode>
)
