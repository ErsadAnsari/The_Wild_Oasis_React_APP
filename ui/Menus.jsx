/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import styled from "styled-components";
import { FiMoreVertical } from "react-icons/fi";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;
const MenuContext=createContext();

function Menus({children})
{
  const[openId,setOpenid]=useState('');
  const[position,setPosition]=useState(null);
  const close=()=>setOpenid("");
  const open=setOpenid;
  return (<MenuContext.Provider value={{ openId, close, open, position, setPosition }}>{children}</MenuContext.Provider>)

}
function Toggle({id}){
  const{openId,open,close,setPosition}=useContext(MenuContext);
  function hanldeClick(e)
  {
   const rect=e.target.closest("button").getBoundingClientRect();
   setPosition({x:window.innerWidth-rect.width-rect.x,y:rect.y+rect.height+8,});
    openId===""||openId!==id?open(id):close();
  }
  return <StyledToggle onClick={hanldeClick}>
    <FiMoreVertical/>
  </StyledToggle>
}
function List({id,children}){

  const{openId,position,close}=useContext(MenuContext);
  const ref = useOutsideClick(close)
  console.log("ersad ", openId !== id)

  if(openId!==id) return null;
  return createPortal(<StyledList position={position} ref={ref}>
    {children}
  </StyledList >,document.body)

}
function Button({ children, icon,onClick}){
  const{close}=useContext(MenuContext);
  function handleClick()
  {
    onClick?.();
    close();
  }

  return(
    <li>

      <StyledButton onClick={handleClick}> {icon}{children}</StyledButton>
    </li>
  )
}
Menus.Menu=Menu;
Menus.Toggle=Toggle;
Menus.List=List;
Menus.Button=Button;
export default Menus;