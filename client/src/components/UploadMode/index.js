import React, { useState } from 'react';

import { uniqueId } from 'lodash';
import filesize from 'filesize';

import { Password, TextField, Verify, ErrorMessage } from './styles.js';

import Upload from '../Upload/upload';
import FileList from '../FileList/FileList';
import CompositionMaster from '../CompositionMaster';

import * as api from '../../services/removeBgService';
import * as passwordService from '../../services/passwordService';

export default function UploadMode({ shouldShowToolBar, shouldEdit }) {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [noBgImages, setNoBgImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldShowError, setShouldShowError] = useState(false);
  const [isCorrectPassword, setIsCorrectPassword] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [isVerifyingPassword, setIsVerifyingPassword] = useState(false);

  const handleUpload = (files) => {
    const upFiles = files.map((file) => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
    }));

    setUploadedFiles(uploadedFiles.concat(upFiles));
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  const handleGenerate = async () => {
    shouldShowToolBar(false);
    setIsLoading(true);
    setShouldShowError(false);

    const images = [];
    let containError = false;

    await Promise.all(
      uploadedFiles.map(async (file) => {
        const base64 = await getBase64(file.file);
        const response = await api.getImageWithoutBg(base64);
        if (response instanceof Error) {
          setShouldShowError(true);
          shouldShowToolBar(true);
          containError = true;
          return;
        }
        const string =
          'data:image/png;base64,' + arrayBufferToBase64(response.data);
        // console.log(string);
        images.push(string);
      })
    );

    setIsLoading(false);
    setNoBgImages(images);
    shouldEdit(!containError);
  };

  const handleDeleteAll = () => {
    setUploadedFiles([]);
    setShouldShowError(false);
  };

  const handleDeleteOne = (item) => {
    const stateCopy = Object.assign([], uploadedFiles);
    const index = stateCopy.indexOf(item);
    stateCopy.splice(index, 1);

    setUploadedFiles(stateCopy);
    setShouldShowError(false);
  };

  const handleReset = () => {
    setIsLoading(false);
    setNoBgImages([]);
    setUploadedFiles([]);
    shouldShowToolBar(true);
    shouldEdit(false);
    setInputPassword('');
    setIsCorrectPassword(false);
    setShouldShowError(false);
  };

  const handlePassword = async (event) => {
    event.preventDefault();
    setIsVerifyingPassword(true);
    const { data } = await passwordService.verifyPassword(inputPassword);
    !data && setShouldShowError(true);
    setIsVerifyingPassword(false);
    setIsCorrectPassword(data);
  };

  return (
    <div>
      {!isCorrectPassword && (
        <Password onSubmit={handlePassword}>
          <TextField
            placeholder="Digite a senha"
            onChange={({ target }) => {
              setShouldShowError(false);
              setInputPassword(target.value);
            }}
            disabled={isVerifyingPassword}
            type="password"
          />
          <Verify onClick={handlePassword} disabled={isVerifyingPassword}>
            Verificar
          </Verify>
        </Password>
      )}

      {!isCorrectPassword && shouldShowError && (
        <ErrorMessage>Senha incorreta</ErrorMessage>
      )}

      {!!isCorrectPassword && !isLoading && !noBgImages.length && (
        <Upload onUpload={handleUpload} />
      )}

      {!!uploadedFiles.length && !noBgImages.length && (
        <FileList
          files={uploadedFiles}
          onGenerate={handleGenerate}
          onDeleteAll={handleDeleteAll}
          onDeleteOne={handleDeleteOne}
          loading={isLoading}
          hasError={shouldShowError}
        />
      )}
      {!!noBgImages.length && !isLoading && (
        <CompositionMaster images={noBgImages} onReset={handleReset} />
      )}
    </div>
  );
}
