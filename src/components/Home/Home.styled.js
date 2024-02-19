import { styled } from "styled-components";


export const TotalHomeContainer = styled.div`
background:#161625;
display:flex;
align-items:center;
flex-direction:column;
height:100vh;
width:100%;
`

export const InputContainer = styled.div`
margin-top:64px;
width:824px;
height:72px;
box-shadow: 0px 8px 16px 0px #171F4614;
background:#2F2F43;
border-radius: 8px;
display: flex;
    align-items: center;
`

export const InputEl = styled.input`
height: 60%;
background: transparent;
border: none;
margin-left: 8px;
&:focus {
    outline: none;
    }
font-family: Roboto400;
font-size: 16px;
font-weight: 400;
line-height: 24px;
letter-spacing: 0px;
text-align: left;
color:#94A3B8;
`
export const SearchIconImg = styled.img`
margin-left:32px;
`