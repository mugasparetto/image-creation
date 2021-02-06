import React, { useState } from 'react';
import { uniqueId } from 'lodash';
import filesize from 'filesize';

import GlobalStyle from './styles/global';
import { Container, Content } from './styles';

import Upload from './components/Upload/upload';
import FileList from './components/FileList/FileList';
import CompositionMaster from './components/CompositionMaster';

import * as api from './services/removeBgService';
import imageExample from './services/base64Example';
import ModeSelector from './components/ModeSelector';
import TestMode from './components/TestMode';
import UploadMode from './components/UploadMode';

function App() {
  const [showToolBar, setShowToolBar] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [mode, setMode] = useState('test');

  const handleModeChange = (mode) => {
    setMode(mode);
  };

  const handleShowToolBar = (statement) => {
    setShowToolBar(statement);
  };

  const handleEditing = (statement) => {
    setIsEditing(statement);
  };

  return (
    <Container>
      <Content isEditing={isEditing}>
        {!!showToolBar && (
          <ModeSelector handleChange={handleModeChange} mode={mode} />
        )}
        {mode === 'test' && <TestMode />}
        {mode === 'upload' && (
          <UploadMode
            shouldShowToolBar={handleShowToolBar}
            shouldEdit={handleEditing}
          />
        )}
      </Content>
      <GlobalStyle />
    </Container>
  );
}

export default App;
