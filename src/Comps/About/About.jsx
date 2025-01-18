import React from 'react'
import NavHome from '../nav/NavHome'
import NavHomeAcc from '../nav/navHomeAcc'
import AboutTop from './AboutTop/AboutTop'
import Achievement from './achievements/Achievement'
import WorkedBy from './WorkedBy/WorkedBy'
import Features from '../Home/Features/Features'
import { useAuth } from '../Context/AuthContext'

const About = () => {

    const {IsLogin} = useAuth()
    
    return (
        <>
        {IsLogin?
        <NavHomeAcc />:
        <NavHome />
        }
        <AboutTop />
        <Achievement />
        <WorkedBy />
        <Features />
        </>
    )
}

export default About