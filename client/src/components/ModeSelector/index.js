import React from 'react';
import { Container } from './styles';

export default function ModeSelector({ handleChange, mode }) {
  return (
    <Container>
      <div className="radio-group">
        <div className="radio-item">
          <input
            type="radio"
            name="mode-selector"
            id="test-mode"
            value="test"
            checked={mode === 'test'}
            onChange={({ target }) => {
              handleChange(target.value);
            }}
          />
          <label htmlFor="test-mode">Imagens de teste</label>
        </div>
        <div className="radio-item">
          <input
            type="radio"
            name="mode-selector"
            id="upload-mode"
            value="upload"
            checked={mode === 'upload'}
            onChange={({ target }) => {
              handleChange(target.value);
            }}
          />
          <label htmlFor="upload-mode">Upload de imagens</label>
        </div>
      </div>
      <hr></hr>
    </Container>
  );
}
