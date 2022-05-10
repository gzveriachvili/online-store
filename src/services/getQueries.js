import { gql } from '@apollo/client';

const getAllProducts = gql`
  query {
    categories {
      name
      products {
        id
        attributes {
          name
        }
        name
        inStock
        gallery
        description
        category
        brand
        attributes {
          id
          name
          type
          items {
            id
            displayValue
            value
          }
        }
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

const getAllCategories = gql`
  query {
    categories {
      name
    }
  }
`;

export { getAllProducts, getAllCategories };
