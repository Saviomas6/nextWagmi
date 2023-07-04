import styled from "styled-components";
export const ButtonWrapper = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button<any>`
  height: 50px;
  width: 170px;
  outline: none;
  border: none;
  border-radius: 10px;
  background-color: #2d2b88;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const Image = styled.img<any>``;
export const Name = styled.div<any>``;
export const Text = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: #000;
  margin: 8px 0;
  text-align: center;
`;
