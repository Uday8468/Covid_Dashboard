import React, { useEffect, useState } from 'react'
import logoImg from "./Images/COVID19INDIA.svg"
import { NavAlignCont, NavItems, NavLogo, NavLogoCont, NavbarContainer } from './header.styled'
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const  navigate = useNavigate();
    const [activePath,setActivePath] = useState("Home")    
    return (
        <NavbarContainer>
            <NavLogoCont>
                <NavLogo src={logoImg} draggable={false} />
            </NavLogoCont>
            <NavAlignCont>
                <NavItems onClick={() => {
                    navigate("/home")
                }} status={activePath === "Home"}>
                    Home
                </NavItems>
                <NavItems onClick={() => {
                    setActivePath("About")
                    console.log(activePath,"in about click")
                    navigate("/about")
                }} status={activePath === "About"}>
                    About
                </NavItems>
            </NavAlignCont>

        </NavbarContainer>
    )
}

export default Header
