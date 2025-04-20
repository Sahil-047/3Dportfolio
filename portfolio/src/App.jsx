import React from 'react'
import Hero from './sections/Hero'
import AnimatedCounter from './components/AnimatedCounter'
import NavBar from './components/Navbar'
import Projects from './sections/Projects'
import LogoShowcase from './sections/LogoShowcase'
import FeatureCards from './sections/FeatureCards'
import Experience from './sections/Experience'
import TechStack from './sections/TechStack'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

const App = () => {
    return (
        <>
            <NavBar />
            <Hero />
            <AnimatedCounter />
            <Projects/>
            <LogoShowcase/>
            <FeatureCards/>
            <Experience/>
            <TechStack/>
            <Contact/>
            <Footer/>
           
        </>
    )
}

export default App