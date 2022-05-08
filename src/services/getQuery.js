import { gql } from '@apollo/client';

const getAllProducts = gql`
  query {
    category {
      products {
        id
        name
        category
        prices {
          currency {
            symbol
          }
          amount
        }
      }
    }
  }
`;

export { getAllProducts };
