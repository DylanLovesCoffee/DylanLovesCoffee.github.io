import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout'
import TerminalContainer from '../components/ui/TerminalContainer'
import TerminalContent from '../components/ui/TerminalContent'
import Button from '../components/ui/Button'
import { Flex } from '../components/ui/Container'

interface LandingPageProps {
  onEnter: () => void
  hasEntered: boolean
}

const LandingPage = ({ onEnter, hasEntered }: LandingPageProps) => {
  const [terminalText, setTerminalText] = useState('')
  const [showEnterButton, setShowEnterButton] = useState(false)
  const [isTyping, setIsTyping] = useState(true)
  const navigate = useNavigate()

  const fullText = `Microsoft Windows [Version 10.0.19041.1]
(c) Microsoft Corporation. All rights reserved.

C:\\Users\\DylanYang> whoami
dylan-yang\\user

C:\\Users\\DylanYang> Get-Profile

Name        : Dylan Yang
Location    : New York City, NY
Status      : Active

C:\\Users\\DylanYang> Get-Skills

Languages   : Go, TypeScript, Python
Platforms   : AWS, Serverless, Kubernetes, Docker
Specialties : Full-stack development, DevOps

C:\\Users\\DylanYang> Start-Portfolio

Starting portfolio application...
Ready.`

  useEffect(() => {
    if (hasEntered) {
      navigate('/portfolio')
      return
    }

    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTerminalText(fullText.slice(0, index + 1))
        index++
      } else {
        setIsTyping(false)
        setShowEnterButton(true)
        clearInterval(timer)
      }
    }, 50)

    return () => clearInterval(timer)
  }, [hasEntered, navigate])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && showEnterButton && !isTyping) {
        handleEnter()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [showEnterButton, isTyping])

  const handleEnter = () => {
    onEnter()
    navigate('/portfolio')
  }

  return (
    <PageLayout>
      <div className="min-h-screen flex items-center justify-center">
        <TerminalContainer title="Windows PowerShell">
          <TerminalContent content={terminalText} isTyping={isTyping} />
          
          {showEnterButton && (
            <Flex direction="col" align="center" gap="lg" className="mt-12">
              <div className="text-center px-4">
                <div className="font-mono text-white text-lg mb-2 animate-pulse">
                  Press <span className="bg-white text-black px-2 py-1 font-bold">ENTER</span> to continue
                </div>
              </div>
              <Button onClick={handleEnter} autoFocus={showEnterButton}>
                [ ACCESS PORTFOLIO ]
              </Button>
            </Flex>
          )}
        </TerminalContainer>
      </div>
    </PageLayout>
  )
}

export default LandingPage