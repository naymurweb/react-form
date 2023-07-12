import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 2px solid ${(props) => (props.error ? "red" : "darkgray")};
  outline: none;
  font-weight: bold;
  font-size: 18px;
  &:focus {
    border: 2px solid skyblue;
  }
`;
export default Input;
