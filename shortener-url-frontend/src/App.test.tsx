import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { getCreateURLMutation } from './Graphql/CreateURLMutation';
import { ApolloError, ApolloProvider, useMutation } from '@apollo/client';
import client from './ApolloClient';
jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useMutation: jest.fn(),
}));


describe('rendering form', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls before each test
    const mockUseMutation = jest.fn();
    mockUseMutation.mockReturnValue([
      () => {}, // Mock mutate function
      { data: null, loading: false, error: undefined } // Mocked mutation result
    ]);
    (useMutation as jest.Mock).mockImplementation(mockUseMutation);
  });
  test('renders form', () => {
    render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    );
    const formElement = screen.getByTestId('form')
    expect(formElement).toBeInTheDocument();
  });
  test('renders title', () => {
    render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    );
    const titleElement = screen.getByText(/URL Shortener/i);
    expect(titleElement).toBeInTheDocument();
  });
  test('renders form', () => {
    render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    );
    const formElement = screen.getByTestId('form')
    expect(formElement).toBeInTheDocument();
  });
  test('renders input for URL', () => {
    render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    );
    const cityElement = screen.getByTestId('URL')
    expect(cityElement).toBeInTheDocument();
  });
  test('renders submit button', () => {
    render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    );
    const submitButtonElement = screen.getByTestId('submit-button')
    expect(submitButtonElement).toBeInTheDocument();
  });
  test('renders results section', () => {
    render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    );
    const resultsSection = screen.getByTestId('results-section')
    expect(resultsSection).toBeInTheDocument();
  });
})
describe('Errors', ()=>{
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls before each test
  });
  test('renders error message when the URL is not correct', () => {
    const mockUseMutation = jest.fn();
    mockUseMutation.mockReturnValue([
      () => {}, // Mock mutate function
      { data: null, loading: false, error: undefined } // Mocked mutation result
    ]);
    (useMutation as jest.Mock).mockImplementation(mockUseMutation);
    render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    );
    const urlInput = screen.getByPlaceholderText('URL');
    fireEvent.change(urlInput, { target: { value: 'google.com' } });
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);
    const errorMessageElement = screen.getByText(/Please check the URL and try again/i);
    expect(errorMessageElement).toBeInTheDocument();
  });

  test('renders the shortened URL correctly', () => {
    const mockUseMutation = jest.fn();
    mockUseMutation.mockReturnValue([
      () => {}, // Mock mutate function
      { data: {createURL:{shortURL:'hello'}}, loading: false, error: undefined } // Mocked mutation result
    ]);
    (useMutation as jest.Mock).mockImplementation(mockUseMutation);
    render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    );
    const urlInput = screen.getByPlaceholderText('URL');
    fireEvent.change(urlInput, { target: { value: 'http://google.com' } });
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);
    const errorMessageElement = screen.getByText(/localhost:3001\/hello/i);
    expect(errorMessageElement).toBeInTheDocument();
  });
})
