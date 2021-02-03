import React from 'react';
import CompositionEditor from '../CompositionEditor';
import CompositionHolder from '../CompositionHolder';
import CompositionStateProvider from './CompositionStateProvider';
import { Container } from './styles';

export default function CompositionMaster({ images, onReset }) {
  return (
    <Container>
      <CompositionStateProvider>
        <CompositionHolder images={images} />
        <CompositionEditor onReset={onReset} />
      </CompositionStateProvider>
    </Container>
  );
}
