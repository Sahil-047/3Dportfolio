import React from 'react'
import Hero from './sections/Hero'
import AnimatedCounter from './components/AnimatedCounter'
import NavBar from './components/HeroModels/Navbar'
const App = () => {
    return (
        <>
            <NavBar />
            <Hero />
            <AnimatedCounter />
        </>
    )
}

export default App