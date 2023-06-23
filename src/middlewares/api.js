import axios from 'axios';

export const fetchGraphQL = async (query, fetchPage) => {
  const data = JSON.stringify({
    query,
    variables: { fetchPage },
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://rickandmortyapi.com/graphql',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  };

  return axios.request(config);
};
