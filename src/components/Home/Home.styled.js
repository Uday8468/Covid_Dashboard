import { styled } from "styled-components";


export const TotalHomeContainer = styled.div`
background:#161625;
display:flex;
align-items:center;
flex-direction:column;
height:100%;
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
export const TotalStateListCont = styled.div`
box-shadow: 0px 4px 16px 0px #00000029;
border: 1px solid #475569;
background: linear-gradient(0deg, #1E1E30, #1E1E30);
width: 1146px;
border-radius: 12px;
margin-top: 106px;
`

export const TotalColumnContainer = styled.div`
height:72px;
width:100%;
display:flex;
align-items:center;
`
export const ColumnContainer = styled.div`
font-family: Roboto600;
font-size: 16px;
font-weight: 700;
line-height: 24px;
letter-spacing: 0em;
text-align: left;
color:#F8FAFC;
`
export const StatesAlignCont = styled.div`
width:30%;
display:flex;
gap:15px;
margin-left:32px;
`
export const RemainingAlignCont = styled.div`
display: flex;
width: 100%;
justify-content: space-around;
`
export const SortIcon = styled.img`
cursor:pointer;
`

export const HorizonatlLine = styled.div`
border: 1px solid #475569;
`