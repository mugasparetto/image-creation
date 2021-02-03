import React, { useContext } from 'react';

import { generate } from 'shortid';

import compositionHorizontal from './CompositionTypes/compositionHorizontal.js';
import compositionVertical from './CompositionTypes/compositionVertical.js';

import p5Wrapper from '../P5Wrapper';
import {
  CompositionDispatchContext,
  CompositionStateContext,
} from '../CompositionMaster/CompositionStateProvider/index.js';
import { Container } from './styles.js';

const P5WrapperHorizontal = p5Wrapper(generate());
const P5WrapperVertical = p5Wrapper(generate());

export default function CompositionHolder({ images }) {
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
      {compositionType === 'horizontal' && (
        <P5WrapperHorizontal
          dispatch={dispatch}
          sketch={compositionHorizontal}
          state={{
            horizontalValue,
            verticalValue,
            spacing,
            displacement,
            size,
            images,
          }}
        />
      )}

      {compositionType === 'vertical' && (
        <P5WrapperVertical
          dispatch={dispatch}
          sketch={compositionVertical}
          state={{
            horizontalValue,
            verticalValue,
            spacing,
            displacement,
            size,
            images,
          }}
        />
      )}
    </Container>
  );
}
