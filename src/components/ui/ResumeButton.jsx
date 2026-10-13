import { useState } from 'react'
import { Download, LoaderCircle } from 'lucide-react'
import { profile } from '../../data/portfolio'

export default function ResumeButton({ className = '' }) {
  const [isDownloading, setIsDownloading] = useState(false)

  async function downloadResume(event) {
    event.preventDefault()
    if (isDownloading) return
    setIsDownloading(true)
    try {
      const response = await fetch(profile.resume)
      if (!response.ok) throw new Error('Resume unavailable')
      const url = URL.createObjectURL(await response.blob())
      const link = document.createElement('a')
      link.href = url
      link.download = profile.resumeDownloadName
      document.body.append(link)
      link.click()
      link.remove()
      window.setTimeout(() => URL.revokeObjectURL(url), 30_000)
    } catch {
      window.location.assign(profile.resume)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <a href={profile.resume} download={profile.resumeDownloadName} onClick={downloadResume} aria-busy={isDownloading} className={`button-secondary ${className}`}>
      {isDownloading ? <LoaderCircle size={21} className="animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <Download size={21} aria-hidden="true" />}
      {isDownloading ? 'Downloading…' : 'Download CV'}
    </a>
  )
}
