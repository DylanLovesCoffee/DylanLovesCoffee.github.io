import { useState, useEffect } from 'react'
import AboutSection from '../components/sections/AboutSection'
import ContactSection from '../components/sections/ContactSection'
import PageLayout from '../components/layout/PageLayout'
import TerminalContainer from '../components/ui/TerminalContainer'
import ContentContainer from '../components/ui/ContentContainer'
import Button from '../components/ui/Button'

type TerminalState = 'typing-intro' | 'showing-menu' | 'showing-content'

const MainPortfolio = () => {
  const [terminalState, setTerminalState] = useState<TerminalState>('typing-intro')
  const [displayText, setDisplayText] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0) // 0 for about, 1 for contact
  const [activeSection, setActiveSection] = useState<'about' | 'contact'>('about')
  const [isTyping, setIsTyping] = useState(true)

  const introText = `C:\\Portfolio> dir

 Directory of C:\\Portfolio

 07/01/2025  12:00 PM    <DIR>          .
 07/01/2025  12:00 PM    <DIR>          ..
 07/01/2025  12:00 PM           2,048   about.exe
 07/01/2025  12:00 PM           1,536   contact.exe
               2 File(s)          3,584 bytes
               2 Dir(s)   1,073,741,824 bytes free

C:\\Portfolio> echo "Welcome!"
Welcome!

Select a program to run:

[1] about.exe
[2] contact.exe

Use ↑↓ to navigate, ENTER to select:`

  const sections = ['about', 'contact'] as const

  // Typewriter effect for intro
  useEffect(() => {
    if (terminalState === 'typing-intro') {
      let index = 0
      const timer = setInterval(() => {
        if (index < introText.length) {
          setDisplayText(introText.slice(0, index + 1))
          index++
        } else {
          setIsTyping(false)
          setTerminalState('showing-menu')
          clearInterval(timer)
        }
      }, 30)

      return () => clearInterval(timer)
    }
  }, [terminalState, introText])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (terminalState === 'showing-menu') {
        switch (event.key) {
          case 'ArrowUp':
            event.preventDefault()
            setSelectedIndex(prev => (prev - 1 + sections.length) % sections.length)
            break
          case 'ArrowDown':
            event.preventDefault()
            setSelectedIndex(prev => (prev + 1) % sections.length)
            break
          case 'Enter':
            event.preventDefault()
            if (selectedIndex === 0) {
              setActiveSection('about')
            } else {
              setActiveSection('contact')
            }
            setTerminalState('showing-content')
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [terminalState, selectedIndex, sections])

  const renderTerminalContent = () => {
    if (terminalState === 'typing-intro' || terminalState === 'showing-menu') {
      return (
        <div className="font-mono text-sm text-white max-h-[50vh] overflow-y-auto leading-relaxed">
          {displayText.split('\n').map((line, index) => (
            <div key={index} className="leading-relaxed mb-1 min-h-[1.2rem]">
              {line.startsWith('C:\\') ? (
                <span>
                  <span className="text-white">{line}</span>
                </span>
              ) : line.startsWith('[') ? (
                <span 
                  className={`${
                    terminalState === 'showing-menu' && selectedIndex === (line.startsWith('[1]') ? 0 : 1)
                      ? 'bg-blue-600 bg-opacity-40 text-white'
                      : 'text-gray-200'
                  } ${terminalState === 'showing-menu' ? 'cursor-pointer' : ''}`}
                  onClick={() => {
                    if (terminalState === 'showing-menu') {
                      const menuIndex = line.startsWith('[1]') ? 0 : 1
                      setSelectedIndex(menuIndex)
                      if (menuIndex === 0) {
                        setActiveSection('about')
                      } else {
                        setActiveSection('contact')
                      }
                      setTerminalState('showing-content')
                    }
                  }}
                >
                  {terminalState === 'showing-menu' && selectedIndex === (line.startsWith('[1]') ? 0 : 1) && '> '}
                  {line}
                </span>
              ) : line.includes('Use ↑↓') ? (
                <span className="text-gray-300">{line}</span>
              ) : (
                <span className="text-gray-100">{line || '\u00A0'}</span>
              )}
              {index === displayText.split('\n').length - 1 && isTyping && terminalState === 'typing-intro' && (
                <span className="inline-block w-2 h-4 bg-white ml-1 animate-pulse"></span>
              )}
            </div>
          ))}
        </div>
      )
    }


    return null
  }

  return (
    <PageLayout>
      {terminalState !== 'showing-content' ? (
        <div className="min-h-screen flex items-center justify-center relative px-6">
          <TerminalContainer title="Command Prompt - C:\\Portfolio">
            {renderTerminalContent()}
          </TerminalContainer>
        </div>
      ) : (
        <ContentContainer>
          <div className="mb-6">
            <Button 
              onClick={() => setTerminalState('showing-menu')}
              variant="secondary"
              className="mb-4"
            >
              ← Back to Terminal
            </Button>
          </div>
          {activeSection === 'about' && <AboutSection />}
          {activeSection === 'contact' && <ContactSection />}
        </ContentContainer>
      )}
    </PageLayout>
  )
}

export default MainPortfolio