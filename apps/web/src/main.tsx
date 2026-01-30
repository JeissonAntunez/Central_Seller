import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
// import './index.css'
// import './index2.css'
// import App from './App.tsx'
// import LoginForm from './pages/auth/LoginForm.tsx'
import LoginPage from './pages/auth/LoginPage.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     {/* <App />  */}
     <BrowserRouter>
      <LoginPage />
     </BrowserRouter>
  </StrictMode>,
)
