import { useEffect } from 'react'
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


  if (loading) {
    return (<h1>Loading......</h1>)
  }
  
  return (
    <div className="App">
      <pre>
        {JSON.stringify(data)}
      </pre>
    </div>
  );
}

export default App;
