import './App.css'
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Work from './components/Work'
import Playreel from './components/Playreel'
import Images from './components/Images'
import Spread from './components/Spread'
import Story from './components/Story'

function App() {
  return (
    <>
      <div className="w-full">
        <Navbar/>
        <Landing/>
        <Work/>
        <Playreel/>
        <Images/>
        <Spread/>
        <Story/>
      </div>
    </>
  )
}

export default App