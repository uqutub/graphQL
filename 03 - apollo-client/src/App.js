import { useEffect, useState } from 'react'
import './App.css';

import { useQuery, gql } from '@apollo/client'
import { LOAD_USERS } from './GraphQL/Queries'

import { useMutation } from '@apollo/client'
import { CREATE_USER_MUTATION } from './GraphQL/Mutations'

import { useSubscription } from '@apollo/client'
import { SUBSCRIBE_USER_ADDED } from './GraphQL/Subscriptions'


function App() {

  const [users, setUsers] = useState([])
  const [form, setForm] = useState({ name: 'aaa', age: 0, married: false })

  // add user using GraphQl Mutation 
  const [createUser, { error: mutationErr }] = useMutation(CREATE_USER_MUTATION)
  const addUser = () => {
    console.log(form)
    createUser({
      variables: {
        n: form.name,
        a: Number(form.age),
        m: form.married
      }
    })
    if (error) {
      console.log('Error on Create User....')
    }
  }

  // -- GraphQL SUBSCRIPTION -- 
  const { data: userSubsDasta, error: subscriptionError, loading: subscriptionLoader } = useSubscription(SUBSCRIBE_USER_ADDED)
  useEffect(() => {
    userSubsDasta && console.log('userSubsDasta: ', userSubsDasta)
    if (userSubsDasta) {
      const newAddedUser = userSubsDasta['newUser']
      const allusers = [...users]     // old users
      allusers.unshift(newAddedUser); // push
      setUsers(allusers)      // re-render
    }
    // logic (todo)
  }, [userSubsDasta])

  // GraphQL Querry
  const { error, loading, data } = useQuery(LOAD_USERS)
  useEffect(() => {
    console.log('dataaaa', data)
    if (data) {
      setUsers(data['getAllUsers'])
    }
  }, [data])


  if (loading) {
    return (<h1>Loading......</h1>)
  }

  return (
    <div className="App">
      <form onChange={({ target }) => {
        const obj = { ...form };
        obj[target.name] = (target.name == 'married') ? target.checked : target.value
        setForm(obj)
      }} onSubmit={(e) => {
        e.preventDefault();
        addUser()
      }}>
        <input type="text" name="name" value={form.name} placeholder="Name" />
        <input type="number" name="age" value={form.age} placeholder="Age" />
        <input type="checkbox" name="married" checked={form.married} /> Married
        <input type="submit" value="Add" />
      </form>
      <pre>
        {JSON.stringify(users, null, 2)}
      </pre>
    </div>
  );
}

export default App;

// getAllUser By Query
// Subscription on NewUser
// Mutation CreateUser

// Mutation DELETE
// SUBSCRITIOPN DELETE


// == CACHING ==
  //   createUser({
  //     variables: {
  //       name: '',
  //       age: 26,
  //       married: false
  //     }, refetechQueries:[{
  //          query: LOAD_USERS
  //     }]
  //   })

  // {
  //   variables: {},
  //   update: (store, { data }) => {
  //     const userData = store.readQuery<UsersQuery>({
  //       query: ''
  //     });

  //     store.writeQuery<UsersQuery>({
  //       query: UsersDocument,
  //       data: {
  //         books: [...userData!.users, daya!.createUser]
  //       }
  //     })
  //   }
  // }