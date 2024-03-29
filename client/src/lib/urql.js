import { Client, cacheExchange, fetchExchange, mapExchange } from '@urql/svelte';
import { browser } from '$app/environment';


const getToken = () => {
  if (browser) {
    return localStorage.getItem('token') || '';
  }
  return '';
};
  
const getCookie = (name) => {
  if (browser) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  return '';
};

export const urqlClient = new Client({
  exchanges: [mapExchange({
    onError(error) {
      console.error(error);
    },
  }),cacheExchange, fetchExchange],
  url: 'https://thepumpapp.azurewebsites.net', // Update with your GraphQL server URL
  fetchOptions: () => {
    const token = getToken()
    const refreshToken = getCookie('refreshToken');
    return {
      headers: {authorization: token ? `Bearer ${token}` : '',
      refreshToken: refreshToken || '',
      
    }}
  },
  credentials: 'include',
  requestPolicy: 'cache-and-network'

});
