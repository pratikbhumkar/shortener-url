import { gql } from "@apollo/client";

export const getCreateURLMutation = (url?: string) =>{
    return gql`
    mutation{
      createURL(input: {longURL: "${url}"})
      {
        longURL
        shortURL
      }
    }
    `;
}
