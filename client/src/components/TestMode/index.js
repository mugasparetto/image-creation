import React, { useState } from 'react';

import { Container, Button, Image } from './styles.js';

import imageExample from '../../services/base64Example';
import CompositionMaster from '../CompositionMaster';

export default function TestMode({ shouldShowToolBar, shouldEdit }) {
  const [testImages, setTestImages] = useState([]);

  const handleShampooClick = () => {
    setTestImages([
      imageExample.getShampoo1(),
      imageExample.getShampoo2(),
      imageExample.getShampoo3(),
    ]);
    shouldShowToolBar(false);
    shouldEdit(true);
  };

  const handleDiaperClick = () => {
    setTestImages([
      process.env.PUBLIC_URL + 'diaperExamples/diaper1.png',
      process.env.PUBLIC_URL + 'diaperExamples/diaper2.png',
      process.env.PUBLIC_URL + 'diaperExamples/diaper3.png',
      process.env.PUBLIC_URL + 'diaperExamples/diaper4.png',
    ]);
    shouldShowToolBar(false);
    shouldEdit(true);
  };

  const handleDeodorantClick = () => {
    setTestImages([
      imageExample.getDeodorant1(),
      imageExample.getDeodorant2(),
      imageExample.getDeodorant3(),
    ]);
    shouldShowToolBar(false);
    shouldEdit(true);
  };

  const handleNailsClick = () => {
    setTestImages([imageExample.getNail1(), imageExample.getNail2()]);
    shouldShowToolBar(false);
    shouldEdit(true);
  };

  const handleReset = () => {
    setTestImages([]);
    shouldShowToolBar(true);
    shouldEdit(false);
  };

  return (
    <div>
      {!testImages.length && (
        <Container>
          <Button onClick={handleShampooClick}>
            <Image
              imgUrl={process.env.PUBLIC_URL + '/dove_shampoo.jpg'}
            ></Image>
            <span style={{ fontSize: '14px' }}>Shapoos - HD</span>
          </Button>
          <Button onClick={handleDiaperClick}>
            <Image
              imgUrl={process.env.PUBLIC_URL + '/fralda-pom-pom.jpg'}
            ></Image>
            <span style={{ fontSize: '14px' }}>Fraldas - HD</span>
          </Button>
          <Button onClick={handleDeodorantClick}>
            <Image
              imgUrl={process.env.PUBLIC_URL + '/desodorante-rexona.jpg'}
            ></Image>
            <span style={{ fontSize: '14px' }}>Desodorantes - Preview</span>
          </Button>
          <Button onClick={handleNailsClick}>
            <Image
              imgUrl={process.env.PUBLIC_URL + '/esmalte_amanha.jpg'}
            ></Image>
            <span style={{ fontSize: '14px' }}>Esmaltes - Preview</span>
          </Button>
        </Container>
      )}
      {!!testImages.length && (
        <CompositionMaster images={testImages} onReset={handleReset} />
      )}
    </div>
  );
}
