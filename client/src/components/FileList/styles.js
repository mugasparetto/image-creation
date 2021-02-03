import styled from 'styled-components';

export const Container = styled.ul`
  margin-top: 20px;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #444;

    & + li {
      margin-top: 15px;
    }
  }
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;

    span {
      font-size: 12px;
      color: '#999';
      margin-top: 5px;

      button {
        border: 0;
        background: transparent;
        color: #e57878;
        margin-left: 5px;
        cursor: pointer;
      }

      button:disabled {
        color: #ccc;
        cursor: default;
      }
    }
  }
`;

export const Preview = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  margin-right: 10px;
`;

export const ButtonDeck = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;

  button {
    margin-right: 8px;
    border: 0;
    border-radius: 4px;
    cursor: pointer;
    width: 144px;
    height: 32px;
    font-weight: bold;
  }

  .generate {
    background: #0076d6;
    color: white;
  }

  .generate:disabled {
    background: #ccc;
    cursor: default;
  }

  .delete-all {
    background-color: #e57878;
    color: white;
  }
`;

export const ErrorMessage = styled.p`
  margin-top: 16px;
  color: #e57878;
  font-weight: bold;
  font-size: 14px;
`;
