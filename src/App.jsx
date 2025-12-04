import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import Areas from './components/Areas'
import InquiryForm from './components/InquiryForm'
import ChatBubble from './components/ChatBubble'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <Services />
        <Testimonials />
        <Areas />
        <InquiryForm />
      </main>
      <Footer />
      <ChatBubble />
    </div>
  )
}

export default App
