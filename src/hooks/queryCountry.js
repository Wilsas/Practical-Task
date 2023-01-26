import { useQuery, gql } from "@apollo/client";


export const COUNTRIES_QUERY = gql`
query GetCountries($region: String!, $cursor: String!, $limit: Int!){
regionalBlocs (name: $region) {
    edges{
      node{
        name
        id
        countrySet(first: $limit, after: $cursor){
          edges{
            node{
              id
              name
              nativeName
              population
              flag
              languages{
                edges{
                  node{
                    id
                    name
                  }
                }
              }
            }
          }
          pageInfo{
            hasNextPage
            endCursor
          }
        }
      }
    }
  }
}
`;

export const queryCountries =( region, cursor, limit ) =>{
  const { error, loading, data, fetchMore } = useQuery(COUNTRIES_QUERY, {
      variables: {
        region,
        cursor,
        limit,
      }
    });

  return {
    error,
    loading,
    data,
    fetchMore,
  };
};