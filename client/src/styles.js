import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: ${(props) => (props.isEditing ? '1366px' : '800px')};
  margin: 30px;
  background: #fff;
  border-radius: 4px;
  padding: 20px;
`;
