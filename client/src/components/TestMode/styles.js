import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button`
  width: calc(25% - 16px);
  height: 200px;
  background: #fff;
  cursor: pointer;
  border: 1px solid #d0d0d0;
  border-radius: 8px;

  :hover {
    border: 1px solid #0076d6;
  }
`;

export const Image = styled.div`
  width: 75%;
  height: 75%;
  background: red;
  margin: 0 auto;
  background: url(${(props) => props.imgUrl}) no-repeat;
  background-size: 100%;
`;
