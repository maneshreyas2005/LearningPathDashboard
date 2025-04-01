import { StrictMode, useContext } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom'
import { RouterProvider ,createBrowserRouter } from 'react-router-dom'
import Header from './components/ui/custom/Header'
import LandingPage from './components/ui/custom/LandingPage'
import UserSelection from './components/ui/custom/UserSelection'
import MilestoneForm from './components/ui/custom/MilestoneForm'
import UserInput from './components/ui/custom/UserInput'
import AiModal from './services/AiModal'
import ContextProvider from './context/ContextProvider'
import { GoogleOAuthProvider } from '@react-oauth/google'

// import App from './App.jsx'

const router = createBrowserRouter([
  {
    path :'/UserInput',
    element : <UserInput/>,
  },
  {
    path :'/',
    element : <App/>,
  },
  {
    path :'/UserSelection',
    element : <UserSelection/>,
  },
  {
    path :'/MilestoneForm',
    element : <MilestoneForm/>,
  },
  {
  path :'/AiModal',
    element : <AiModal />,
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <RouterProvider router={router} />
    
      </GoogleOAuthProvider>
  </StrictMode>,
)
