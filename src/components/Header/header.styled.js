import { styled } from "styled-components";


export const NavbarContainer = styled.div`
height:80px;
width:100%;
background:#1E1E30;
display:flex;
justify-content:space-between;
padding:0px 150px;
`

export const NavLogoCont = styled.div`
cursor:pointer;
display:flex;
justify-content:center;
align-items:center;
`

export const NavLogo = styled.img`
`

export const NavAlignCont = styled.div`
display:flex;
justify-content:center;
align-items:center;
gap:50px;
`
export const NavItems = styled.div`
font-family: ${(props) => (props.status ? 'Roboto500' : 'Roboto400')} ;
font-size: 16px;
font-weight: ${(props) => (props.status ? '500' : '400')};
line-height: 24px;
letter-spacing: 0em;
text-align: left;
color:${(props) => (props.status ? '#F8FAFC' : '#94A3B8')};
cursor:pointer;
`