import styled from "styled-components";

const Button = styled.button`
  background-color: lightblue;
  cursor:pointer;
  padding: 10px 40px;
  border-radius: 10px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  border: none;
  transition-duration: 0.4s;

  &:hover {
    background-color: aqua;
  }
  font-weight: bold;
`;
export default Button;
