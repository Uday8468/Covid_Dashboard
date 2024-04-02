import { styled } from "styled-components";


export const TotalHomeContainer = styled.div`
background:#161625;
display:flex;
align-items:center;
flex-direction:column;
height:${(props) => props?.status ? "100vh" : "100%"};
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

export const TotalOptionIconDiv = styled.div`
display: flex;
    align-items: center;
    width: 76px;
    height: 32px;
    justify-content: center;
    background: #1CD4D429;
    border-radius: 4px;
    gap: 5px;
    margin-right: 24px
`

export const OptionIconText = styled.div`
font-family: Roboto600;
font-size: 16px;
line-height: 24px;
text-align: left;
color:#FACC15;
`
export const TotalOptionDiv = styled.div`
border: 1px solid ;
height: 64px;
background:inherit;
color:#64748B;
font-size:16px;
font-family:Roboto400;
border-left:none;
border-top:none;
border-right:none;
width: 100%;
display: flex;
justify-content: space-between;
align-items:center;
`

export const TotalStateNameCont = styled.div`
display:flex;
justify-content:space-between;
width: 100%;
height: 64px;
margin-top: 64px;

`

export const StateNameCont = styled.div`
background: #0284C729;
border-radius:32px;
width: 312px;
height:100%;
display:flex;
justify-content:center;
align-items:center;
font-family: Roboto500;
font-size: 32px;
color:#0EA5E9;
`

export const TotalTestedCountCont = styled.div`
display:flex;
flex-direction:column;
height:100%;
gap:4px;
align-items:flex-end;
justify-content:center;
`

export const TestedText = styled.div`
font-family: Roboto500;
font-size: 16px;
line-height: 24px;
text-align: left;
color:#94A3B8;
`
export const TestedCount = styled.div`
font-family: Roboto500;
font-size: 24px;
line-height: 24px;
text-align: right;
color:#94A3B8;
`

export const LastUpdatedText = styled.div`
margin-top:12px;
font-family: Roboto400;
font-size: 18px;
line-height: 24px;
text-align: left;
color:#CBD5E1;
`