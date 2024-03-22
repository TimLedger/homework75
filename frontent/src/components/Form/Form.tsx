import React, { useState } from 'react';
import { FormData } from '../../types';
import { Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';

interface Props {
  onFormSubmit: (vigenere: FormData, action: 'encode' | 'decode') => void;
  isLoading: { encode: boolean; decode: boolean };
  result: string;
}

const Form: React.FC<Props> = ({onFormSubmit, isLoading, result}) => {
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
            id="decode" label="decode"
            name="decode"
            value={state.decode || result}
            onChange={changeData}
          />
        </Grid>
        <Grid item xs>
          <TextField
            required
            id="password" label="Password"
            name="password"
            value={state.password}
            onChange={changeData}
            sx={{width: '300px', mr: '20px'}}
          />
          <LoadingButton
            type="submit"
            color="primary"
            variant="contained"
            disabled={isLoading.encode}
            loading={isLoading.encode}
            loadingPosition="start"
            startIcon={<SaveIcon/>}
            onClick={submitEncodeHandler}
          >
            Down
          </LoadingButton>
          <LoadingButton
            type="submit"
            color="primary"
            variant="contained"
            disabled={isLoading.decode}
            loading={isLoading.decode}
            loadingPosition="start"
            startIcon={<SaveIcon/>}
            onClick={submitDecodeHandler}
            sx={{mr: '20px'}}
          >
            Up
          </LoadingButton>
        </Grid>
        <Grid item xs>
          <TextField
            required
            id="encoded" label="encoded"
            name="encoded"
            value={state.encode || result}
            onChange={changeData}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;