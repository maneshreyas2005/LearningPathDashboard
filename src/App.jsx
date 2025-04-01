import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button";
import  Hero from './components/ui/custom/Hero'
import LandingPage from './components/ui/custom/LandingPage';
import { Toaster } from 'sonner';
import { Context } from './context/ContextProvider';

function App() {
  const [count, setCount] = useState(0);
  const data = useContext(Context);

  return (
    <>
      {/* Hero */}
      <LandingPage data ={data}/>
      <Toaster /> 
    </>
  )
}

export default App
