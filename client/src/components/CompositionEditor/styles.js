import styled from 'styled-components';

export const Container = styled.div`
  margin-left: 16px;
  flex: 1 1 auto;
  position: relative;

  label {
    display: flex;
    flex-direction: column;
  }

  .slider-group {
    display: flex;
    margin-top: 16px;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .slider-item {
    margin-right: 16px;
    width: calc(50% - 16px);
  }

  .slider-item:nth-child(n + 3) {
    margin-top: 16px;
  }

  .radio-group {
    display: flex;
    margin-top: 16px;
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

  input[type='range'] {
    width: 100%;
  }

  label {
    margin-bottom: 8px;
  }

  section {
    margin-left: 16px;
    flex: 1 1 auto;
    position: relative;
  }
`;

export const ButtonDeck = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 40px;
  width: 100%;

  button {
    margin-right: 8px;
    border: 0;
    border-radius: 4px;
    cursor: pointer;
    width: 144px;
    height: 40px;

    font-weight: 600;
  }

  #save {
    background-color: #0076d6;
    color: white;
  }

  #reset {
    background-color: #ebf6ff;
    color: #0076d6;
  }
`;
