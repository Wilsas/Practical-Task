import { useQuery, gql } from "@apollo/client";

export const BLOC_QUERY = gql`
query {
  regionalBlocs{
    edges{
      node{
        name
        id
      }
    }
  }
}
`;

export const queryBlocs =() =>{
  const { error, loading, data } = useQuery(BLOC_QUERY);

  return {
    error,
    loading,
    data,
  };
};