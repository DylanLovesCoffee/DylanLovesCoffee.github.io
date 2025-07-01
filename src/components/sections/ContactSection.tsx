import { useState, useEffect } from 'react'
import { Container } from '../ui/Container'

const ContactMonitor = () => {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  const fullText = `C:\\Portfolio> netstat -an | findstr ESTABLISHED

Active Connections

  Proto  Local Address          Foreign Address        State
  TCP    192.168.1.100:1234     github.com:443         ESTABLISHED
  TCP    192.168.1.100:5678     linkedin.com:443       ESTABLISHED
  TCP    192.168.1.100:9012     email.server:993       ESTABLISHED

C:\\Portfolio> nslookup contact.dylan-yang.local

Server:  dns.local
Address:  192.168.1.1

Non-authoritative answer:
Name:    contact.dylan-yang.local
Address:  127.0.0.1

C:\\Portfolio> systeminfo | findstr /B /C:"Contact Methods"

Contact Information for dylan.exe:
==================================
Method    Address                              Status
------    -------                              ------
GitHub    https://github.com/DylanLovesCoffee  Active
LinkedIn  https://linkedin.com/in/dylanwyang/  Active
Email     dylan.yang@datadoghq.com             Active
Resume    /resume.pdf                          Not Available

C:\\Portfolio> ping -t connectivity.status

Pinging connectivity.status [127.0.0.1] with 32 bytes of data:

Reply from 127.0.0.1: bytes=32 time<1ms TTL=64
Reply from 127.0.0.1: bytes=32 time<1ms TTL=64
Reply from 127.0.0.1: bytes=32 time<1ms TTL=64

Connectivity Status: ONLINE
Response Time: Excellent
Availability: 24/7

C:\\Portfolio>`

  useEffect(() => {
    if (isComplete) return

    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1))
        index++
      } else {
        setIsComplete(true)
        clearInterval(timer)
      }
    }, 25)

    // Handle ENTER key to skip typewriter effect
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && !isComplete) {
        setDisplayText(fullText)
        setIsComplete(true)
        clearInterval(timer)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => {
      clearInterval(timer)
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [fullText, isComplete])


  return (
    <div className="bg-blue-900 windows-border p-1">
      <div className="windows-titlebar p-2 mb-1">
        <span className="font-mono text-black text-sm font-bold">Network Diagnostics - Contact Information</span>
      </div>
      <div className="bg-blue-900 p-6 h-96 overflow-y-auto">
        <pre className="font-mono text-sm text-white leading-relaxed whitespace-pre-wrap">
          {displayText}
          {!isComplete && (
            <span className="inline-block w-2 h-4 bg-white ml-1 animate-pulse"></span>
          )}
        </pre>
      </div>
    </div>
  )
}

// Main ContactSection component
const ContactSection = () => {
  return (
    <Container size="lg" padding="md" id="contact">
      <ContactMonitor />
    </Container>
  )
}

export default ContactSection