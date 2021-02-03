import React, { useContext } from 'react';

import {
  CompositionDispatchContext,
  CompositionStateContext,
} from '../CompositionMaster/CompositionStateProvider/index.js';
import { ButtonDeck, Container } from './styles.js';

export default function CompositionEditor({ onReset }) {
  const dispatch = useContext(CompositionDispatchContext);
  const {
    horizontalValue,
    verticalValue,
    spacing,
    displacement,
    size,
    compositionType,
  } = useContext(CompositionStateContext);

  return (
    <Container>
      <section>
        <h2>Controles</h2>
        <h3 style={{ marginTop: '24px' }}>Tipo de composição</h3>
        <div className="radio-group">
          <div className="radio-item">
            <input
              type="radio"
              name="composition-type"
              id="radio-horizontal"
              value="horizontal"
              checked={compositionType === 'horizontal'}
              onChange={({ target }) => {
                dispatch({
                  type: 'SET_COMPOSITION_TYPE',
                  payload: target.value,
                });
              }}
            />
            <label htmlFor="radio-horizontal">Horizontal</label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              name="composition-type"
              id="radio-vertical"
              value="vertical"
              checked={compositionType === 'vertical'}
              onChange={({ target }) => {
                dispatch({
                  type: 'SET_COMPOSITION_TYPE',
                  payload: target.value,
                });
              }}
            />
            <label htmlFor="radio-vertical">Vertical</label>
          </div>
        </div>

        <h3 style={{ marginTop: '24px' }}>Posicionamento</h3>
        <div className="slider-group">
          <div className="slider-item">
            <label>Horizontal</label>
            <input
              type="range"
              value={horizontalValue}
              min={-500}
              max={500}
              onChange={(event) =>
                dispatch({
                  type: 'SET_HORIZONTAL_VALUE',
                  payload: +event.target.value,
                })
              }
            />
          </div>
          <div className="slider-item">
            <label>Vertical</label>
            <input
              type="range"
              value={verticalValue}
              min={-500}
              max={500}
              onChange={(event) =>
                dispatch({
                  type: 'SET_VERTICAL_VALUE',
                  payload: +event.target.value,
                })
              }
            />
          </div>
          <div className="slider-item">
            <label htmlFor="horizontal">Espaçamento</label>
            <input
              type="range"
              value={spacing}
              min={-200}
              max={200}
              onChange={(event) =>
                dispatch({
                  type: 'SET_SPACING',
                  payload: +event.target.value,
                })
              }
            />
          </div>
          <div className="slider-item">
            <label>Deslocamento</label>
            <input
              type="range"
              value={displacement}
              min={-100}
              max={100}
              onChange={(event) =>
                dispatch({
                  type: 'SET_DISPLACEMENT',
                  payload: +event.target.value,
                })
              }
            />
          </div>
          <div className="slider-item">
            <label htmlFor="horizontal">Tamanho</label>
            <input
              type="range"
              value={size}
              min={-0.55}
              max={0.55}
              step={0.01}
              onChange={(event) =>
                dispatch({
                  type: 'SET_SIZE',
                  payload: +event.target.value,
                })
              }
            />
          </div>
        </div>
      </section>
      <ButtonDeck>
        <button id="save">Download</button>
        <button
          id="reset"
          onClick={() => {
            onReset();
          }}
        >
          Reiniciar
        </button>
      </ButtonDeck>
    </Container>
  );
}
