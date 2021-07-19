import { useEffect } from 'react'
import logo from './logo.svg';
import './App.css';

import { useQuery, gql } from '@apollo/client'
import { LOAD_USERS } from './GraphQL/Queries'

import { useMutation } from '@apollo/client'
import { CREATE_USER_MUTATION } from './GraphQL/Mutations'


function App() {

  // // add user using mutation
  // const [createUser, { error }] = useMutation(CREATE_USER_MUTATION)
  // const addUser = () => {
  //   createUser({
  //     variables: {
  //       name: '',
  //       age: 26,
  //       married: false
  //     }
  //   })
  //   if(error) {
  //     console.log('Error on Create User....')
  //   }
  // }
  
  const { error, loading, data } = useQuery(LOAD_USERS)
  useEffect(() => {
    console.log('dataaaa', data)
  }, [data])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
