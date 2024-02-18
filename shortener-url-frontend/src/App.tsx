import { FormEvent, useEffect, useState } from 'react';
import './App.css';
import { MyInput } from './Components/MyInput/MyInput';
import { useMutation } from '@apollo/client';
import { getCreateURLMutation } from './Graphql/CreateURLMutation';
import { Results } from './Components/Results/Results';
import { validateURL } from './utils/validateURL';


function App() {
  const [url, setURL] = useState<string>();
  const [shortURLs, setShortURLs] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [mutateFunction, { data, loading, error }] = useMutation(getCreateURLMutation(url));

  const submitForm = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (validateURL(url)) {
      mutateFunction()
    }else{
      setErrorMessage('Please check the URL and try again')
    }
  }

  useEffect(() => {
    if (data?.createURL.shortURL) {
      setShortURLs([...shortURLs, data?.createURL.shortURL])
    }else if(error?.message){
      setErrorMessage(error.message)
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
        {errorMessage && 
            <div>
              Error: {errorMessage}
            </div>
        }
      </div>
    </div>
  );
}

export default App;
