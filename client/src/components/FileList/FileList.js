import React from 'react';
import { MdCheckCircle } from 'react-icons/md';
import Loader from 'react-loader-spinner';

import {
  Container,
  FileInfo,
  Preview,
  ButtonDeck,
  ErrorMessage,
} from './styles';

export default function FileList({
  files,
  onGenerate,
  onDeleteOne,
  onDeleteAll,
  loading,
  hasError,
}) {
  return (
    <Container>
      {files.map((file) => (
        <li key={file.id}>
          <FileInfo>
            <Preview src={file.preview} />
            <div>
              <strong>{file.name}</strong>
              <span>
                {file.readableSize}{' '}
                <button onClick={() => onDeleteOne(file)} disabled={loading}>
                  Excluir
                </button>
              </span>
            </div>
          </FileInfo>

          <div style={{ display: 'flex' }}>
            <MdCheckCircle size={24} color="#138647" />
          </div>
        </li>
      ))}
      <ButtonDeck>
        <button className="generate" onClick={onGenerate} disabled={loading}>
          {loading ? (
            <Loader type="TailSpin" color="#fff" height={16} width={16} />
          ) : (
            'Gerar composição'
          )}
        </button>
        {!loading && (
          <button onClick={onDeleteAll} className="delete-all">
            Excluir tudo
          </button>
        )}
      </ButtonDeck>
      {hasError && (
        <ErrorMessage>Erro no processamento. Tente novamente.</ErrorMessage>
      )}
    </Container>
  );
}
