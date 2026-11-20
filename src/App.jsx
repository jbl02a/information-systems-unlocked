import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { ProgressProvider } from './context/ProgressContext'
import ScrollToTop from './components/ScrollToTop'
import UpdatePrompt from './components/UpdatePrompt'
import Navbar from './components/Navbar'
import UnitSwitcher from './components/UnitSwitcher'
import { UnitProvider, useUnit } from './context/UnitContext'
import { unitById } from './data/topics'
import Home from './pages/Home'
import PracticeExam from './pages/PracticeExam'
import { LessonsIndex, Lesson } from './pages/Lessons'
import Matching from './pages/Matching'
import Cards from './pages/Cards'
import CramSheet from './pages/CramSheet'

function Footer() {
  const { unit } = useUnit()
  return <>Intro to Information Systems · {unitById(unit).label}</>
}

export default function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <UnitProvider>
        <ScrollToTop />
        <div className="min-h-screen bg-page text-body">
          <Navbar />
          <UnitSwitcher />
          <main className="max-w-5xl mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/notes" element={<LessonsIndex />} />
              <Route path="/notes/:lessonId" element={<Lesson />} />
              <Route path="/exam" element={<PracticeExam />} />
              <Route path="/matching" element={<Matching />} />
              <Route path="/cards" element={<Cards />} />
              <Route path="/cram" element={<CramSheet />} />
            </Routes>
          </main>
          <footer className="app-foot text-center text-xs text-muted py-8">
            <Footer />
          </footer>
        </div>
        <UpdatePrompt />
        {/* Vercel Web Analytics: cookieless, no personal data, and nothing in the
            UI. It counts page views on the Vercel dashboard only; the student
            never sees it. No-ops off Vercel. */}
        <Analytics />
        </UnitProvider>
      </BrowserRouter>
    </ProgressProvider>
  )
}
