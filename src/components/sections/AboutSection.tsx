import { useState, useEffect } from 'react'
import { Container } from '../ui/Container'

// Simulated process monitoring data for reference


// Calculate uptime since October 31, 2017
const calculateUptime = () => {
  const startDate = new Date('2017-10-31')
  const currentDate = new Date()
  const diffTime = Math.abs(currentDate.getTime() - startDate.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  const years = Math.floor(diffDays / 365)
  const months = Math.floor((diffDays % 365) / 30)
  const days = diffDays % 30
  
  return `${years} years, ${months} months, ${days} days`
}

const ProcessMonitor = () => {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const uptime = calculateUptime()

  const fullText = `C:\\Portfolio> tasklist /FI "IMAGENAME eq dylan.exe" /V

Image Name                     PID Session Name        Session#    Mem Usage Status          User Name              CPU Time Window Title
========================= ======== ================ =========== ============ =============== ================== ============ ===============================
dylan.exe                     1337 Console                    1     512,000K Running         SYSTEM               0:15:30.25 Technical Account Manager

C:\\Portfolio> wmic process where "name='dylan.exe'" get ProcessId,Name,PageFileUsage,WorkingSetSize,ThreadCount,HandleCount

HandleCount  Name       PageFileUsage  ProcessId  ThreadCount  WorkingSetSize
1024         dylan.exe  524288         1337       8            536870912

C:\\Portfolio> systeminfo | findstr /B /C:"Registered Owner" /C:"Domain" /C:"Logon Server"

Process Details for PID 1337:
=============================
Property                 Value
--------                 -----
Location                 New York City, NY
Role                     Technical Account Manager
Company                  Datadog
Uptime                   ${uptime}

C:\\Portfolio> perfmon /res dylan.exe

Analyzing process performance metrics...

Skill Proficiency Report:
========================
Skill                    Value    Status
-----                    -----    ------
Coding Ability           82%      Good
Presentations            78%      Good
Enablement               92%      Outstanding
AI Whispering            88%      Excellent
Technical Writing        81%      Good
Problem Solving          89%      Excellent

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
        <span className="font-mono text-black text-sm font-bold">Task Manager - Process Details</span>
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

// Main AboutSection component
const AboutSection = () => {
  return (
    <Container size="lg" padding="md" id="about">
      <ProcessMonitor />
    </Container>
  )
}

export default AboutSection