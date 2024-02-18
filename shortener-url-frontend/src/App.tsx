import { FormEvent, useEffect, useState } from 'react';
import './App.css';
import { MyInput } from './Components/MyInput/MyInput';
import { useMutation } from '@apollo/client';
import { getCreateURLMutation } from './Graphql/CreateURLMutation';
import { Results } from './Components/Results/Results';

function App() {
  const [url, setURL] = useState<string>();
  const [shortURLs, setShortURLs] = useState<string[]>([]);

  const [mutateFunction, { data, loading, error }] = useMutation(getCreateURLMutation(url));

  const submitForm = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    mutateFunction()
  }

  useEffect(() => {
    if (data?.createURL.shortURL) {
      setShortURLs([...shortURLs, data?.createURL.shortURL])
    }
  }, [loading, error, data?.createURL])

  return (
    <div className="App">
      <div className='Container'>
        <h1>URL Shortener</h1>
        <form data-testid={'form'} className='form' onSubmit={(event) => submitForm(event)}>
          <div className='content'>
            <MyInput placeHolder='URL' setValue={setURL} title={'URL'} value={url} name={'URL'} />
            <button data-testid={'submit-button'} className="submit-button" type='submit'>Shorten URL</button>
          </div>
        </form>
        <Results shortURLs={shortURLs}/>
      </div>
    </div>
  );
}

export default App;
