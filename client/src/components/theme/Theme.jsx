import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/system'
import { darkTheme,lightTheme } from '../../constants/theme/theme'
import { useAuth } from '../../hooks/useAuth'

export default function Theme({ children }) {
  const { darkMode } = useAuth()
  return (
    <ThemeProvider theme={darkMode?darkTheme:lightTheme}>
      <CssBaseline />
      { children }
    </ThemeProvider>
  )
}
