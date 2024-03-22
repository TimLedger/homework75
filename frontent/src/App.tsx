import React, {useState} from 'react';
import Form from './components/Form/Form';
import {FormData} from "./types";
import axios from "axios";
import './App.css';

const App: React.FC = () => {
  const [result, setResult] = useState(''); 
  const [isLoading, setIsLoading] = useState({
    encode: false,
    decode: false,
  });

  const onFormSubmit = async (vigenere: FormData, action: 'encode' | 'decode') => {
    setIsLoading((prevLoading) => ({ ...prevLoading, [action]: true }));
    try {
      const response = await axios.post(`/${action}`, {
        password: vigenere.password,
        message: vigenere[action === 'encode' ? 'decode' : 'encode'],
      });

      setResult(action === 'encode' ? response.data.encoded : response.data.decoded);
    } finally {
      setIsLoading((prevLoading) => ({ ...prevLoading, [action]: false }));

    }
  };

  return (
    <div>
      <Form onFormSubmit={onFormSubmit} isLoading={isLoading} result={result}/>
    </div>
  );
};

export default App;