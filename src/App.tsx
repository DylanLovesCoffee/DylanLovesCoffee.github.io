import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import MainPortfolio from './pages/MainPortfolio'

function App() {
  const [hasEnteredPortfolio, setHasEnteredPortfolio] = useState(false)

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route 
            path="/" 
            element={
              <LandingPage 
                onEnter={() => setHasEnteredPortfolio(true)}
                hasEntered={hasEnteredPortfolio}
              />
            } 
          />
          <Route 
            path="/portfolio" 
            element={<MainPortfolio />} 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
