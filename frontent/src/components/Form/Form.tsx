import React, { useState } from 'react';
import { FormData } from '../../types';
import { Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';

interface Props {
  onFormSubmit: (vigenere: FormData, action: 'encode' | 'decode') => void;
  isLoading: boolean;
}

const Form: React.FC<Props> = ({onFormSubmit, isLoading}) => {
  const [state, setState] = useState<FormData>({
    password: '',
    encode: '',
    decode: '',
  });

  const submitEncodeHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(state, 'encode');
  };

  const submitDecodeHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(state, 'decode');
  };


  const changeData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            required
            id="password" label="Password"
            name="password"
            value={state.password}
            onChange={changeData}
          />
        </Grid>
        <Grid item xs>
          <TextField
            required
            id="encodedMessage" label="encodedMessage"
            name="encodedMessage"
            value={state.encode}
            onChange={changeData}
          />
        </Grid>
        <Grid item xs>
          <TextField
            required
            id="decodedMessage" label="decodedMessage"
            name="decodedMessage"
            value={state.decode}
            onChange={changeData}
          />
        </Grid>
        <Grid item xs>
          <LoadingButton
            type="submit"
            color="primary"
            variant="contained"
            disabled={isLoading}
            loading={isLoading}
            loadingPosition="start"
            startIcon={<SaveIcon/>}
            onClick={submitEncodeHandler}
          >
            Down
          </LoadingButton>
        </Grid>
        <Grid item xs>
          <LoadingButton
            type="submit"
            color="primary"
            variant="contained"
            disabled={isLoading}
            loading={isLoading}
            loadingPosition="start"
            startIcon={<SaveIcon/>}
            onClick={submitDecodeHandler}
          >
            Up
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;