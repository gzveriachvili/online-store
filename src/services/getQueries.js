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

    currencies {
      symbol
    }
  }
`;

const productRequest = (productId) => gql`
        query {
          
          product(id: "${productId}") {
            name
            inStock
            gallery
            description
            category
            attributes {
              
              name
              items {
                id
                value
                displayValue
              }
            }
            prices {
              amount
              currency {
                symbol
              }
            }
            brand
          }
        }
      `;

export { getAllProducts, getAllCategories, productRequest };
