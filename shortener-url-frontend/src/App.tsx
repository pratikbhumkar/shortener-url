import { FormEvent, useEffect, useState } from 'react';
import './App.css';
import { MyInput } from './Components/MyInput/MyInput';
import { useMutation, ApolloError } from '@apollo/client';
import { getCreateURLMutation } from './Graphql/CreateURLMutation';
import { Results } from './Components/Results/Results';
import { validateURL } from './utils/validateURL';


function App() {
  const [url, setURL] = useState<string>();
  const [shortURLs, setShortURLs] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [mutateFunction, { data, loading, error }] = useMutation(getCreateURLMutation(url), {
    onError: (error: ApolloError) => {
      handleError(error);
    }
  });

  const submitForm = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (validateURL(url)) {
      mutateFunction()
    }else{
      setErrorMessage('Please check the URL and try again')
    }
  }
  
  const handleError = (error: ApolloError) => {
    setErrorMessage(error.message);
  }

  useEffect(() => {
    if (data?.createURL.shortURL) {
      setShortURLs([...shortURLs, data?.createURL.shortURL])
    }
  }, [loading, error, data?.createURL])

  return (
    <div className="App">
      <div className='Container'>
        <h1 data-testid={'header'}>URL Shortener</h1>
        <form data-testid={'form'} className='form' onSubmit={(event) => submitForm(event)}>
          <div className='content'>
            <MyInput placeHolder='URL' setValue={setURL} title={'Long URL'} value={url} name={'URL'} />
            <button data-testid={'submit-button'} className="submit-button" type='submit'>Shorten URL</button>
          </div>
        </form>
        <Results shortURLs={shortURLs}/>
        {errorMessage && 
            <div data-testid={'error-section'}>
              Error: {errorMessage}
            </div>
        }
      </div>
    </div>
  );
}

export default App;
