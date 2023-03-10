import React from "react";
import styled from "styled-components";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsInstagram, BsFacebook } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";

const StyledDiv = styled.div`
  color: black;
  align-items: flex-start;
  display: flex;
`;



  
export const IconLogin = (props) => {
  return (  
      
      
        <StyledDiv>
          <BiUserCircle className={props.className} />
        </StyledDiv>
     
  );
};

export const IconCart = (props) => {
  return (

    <StyledDiv>
      <AiOutlineShoppingCart className={props.className}/>
    </StyledDiv>
  );
};
export const IconInstagram = (props) => {
  return (
    <a href={props.url} target="_blank" rel="noreferrer" >
      <StyledDiv>
        <BsInstagram className={props.className}/>
      </StyledDiv>
    </a>
    
  );
};
export const IconFacebook = (props) => {
  return (

    <a href={props.url} target="_blank" rel="noreferrer">

    <StyledDiv>      
      <BsFacebook className={props.className}/>
    </StyledDiv>
    </a>
    
  );
};
