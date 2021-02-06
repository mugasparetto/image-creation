import React, { useState } from 'react';

import { uniqueId } from 'lodash';
import filesize from 'filesize';

import Upload from '../Upload/upload';
import FileList from '../FileList/FileList';
import CompositionMaster from '../CompositionMaster';

import * as api from '../../services/removeBgService';
import imageExample from '../../services/base64Example';

export default function UploadMode({ shouldShowToolBar, shouldEdit }) {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [noBgImages, setNoBgImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldShowError, setShouldShowError] = useState(false);

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
      uploadedFiles.map(async (file, index) => {
        // --------API--------;
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
        console.log(string);
        images.push(string);

        //-------- SHAMPOO --------
        // switch (index) {
        //   case 0:
        //     images.push(imageExample.getShampoo1());
        //     break;
        //   case 1:
        //     images.push(imageExample.getShampoo2());
        //     break;
        //   default:
        //     images.push(imageExample.getShampoo3());
        //     break;
        // }

        //-------- FRALDAS --------
        // switch (index) {
        //   case 0:
        //     images.push(imageExample.getDiaper1());
        //     break;
        //   case 1:
        //     images.push(imageExample.getDiaper2());
        //     break;
        //   case 2:
        //     images.push(imageExample.getDiaper3());
        //     break;
        //   default:
        //     images.push(imageExample.getDiaper4());
        //     break;
        // }

        //-------- DESODORANTE --------
        // switch (index) {
        //   case 0:
        //     images.push(imageExample.getDeodorant1());
        //     break;
        //   case 1:
        //     images.push(imageExample.getDeodorant2());
        //     break;
        //   default:
        //     images.push(imageExample.getDeodorant3());
        //     break;
        // }

        //-------- ESMALTE --------
        // switch (index) {
        //   case 0:
        //     images.push(imageExample.getNail1());
        //     break;
        //   default:
        //     images.push(imageExample.getNail2());
        //     break;
        // }
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
  };

  return (
    <div>
      {!isLoading && !noBgImages.length && <Upload onUpload={handleUpload} />}

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
