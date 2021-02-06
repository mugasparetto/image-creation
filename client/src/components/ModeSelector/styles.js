import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 24px;

  label {
    display: flex;
    flex-direction: column;
  }

  .radio-group {
    display: flex;
    justify-content: start;
  }

  .radio-item {
    display: flex;
    align-items: baseline;
    margin-right: 24px;
  }

  input[type='radio'] {
    margin-right: 8px;
  }

  label {
    margin-bottom: 16px;
  }
`;
