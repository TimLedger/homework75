import React, {useState} from 'react';
import Form from './components/Form/Form';
import {FormData} from "./types";
import axios from "axios";
import './App.css';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onFormSubmit = async (vigenere: FormData, action: 'encode' | 'decode') => {
      setIsLoading(true);
      try {
          const response = await axios.post('/', vigenere);

          if (action === 'encode') {
              console.log('Encoded:', response.data.encoded);
          } else {
              console.log('Decoded:', response.data.decoded);
          }
      } catch (error) {
          console.error('Error:', error);
      } finally {
          setIsLoading(false);
      }
  };

  return (
    <div>
      <Form onFormSubmit={onFormSubmit} isLoading={isLoading}/>
    </div>
  );
};

export default App;