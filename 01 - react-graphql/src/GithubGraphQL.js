import { useEffect } from 'react'
import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.github.com',      // Github
    headers: {
        Authorization: `bearer ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`,  // access token
    }
});

function GithubGraphQl() {

    // const fetchData_js = async (organizationName) => {
    //     const QUERY_ORGANIZATION = `query {
    //         organization(login: "${organizationName}") {
    //             name
    //             description
    //             url
    //             createdAt
    //         }
    //         viewer {
    //             login
    //             email
    //             company
    //             repositories(first: 5) {
    //                 edges {
    //                     node {
    //                         name
    //                     }
    //                 }
    //             }
    //         }
    //     }`;

    //     const res = await api.post('/graphql', { query: QUERY_ORGANIZATION })
    //     console.log('GraphQL Response: ', res);
    // }

    const fetchData_ql = async (organizationName) => {

        const QUERY_ORGANIZATION = `query queryOrganization($organizationName: String!){
            organization(login: $organizationName) {
                name
                description
                url
                createdAt
            }
            viewer {
                login
                email
                company
                repositories(first: 5) {
                    edges {
                        node {
                            name
                        }
                    }
                }
            }
        }`;

        const res = await api.post('/graphql', {
            query: QUERY_ORGANIZATION,
            variables: {
                organizationName
            }
        })
        console.log('GraphQL Response: ', res);
    }

    const addStart = async (repositoryId) => {
        const MUTATION_ADD_START = `mutation AddStarToMyRepo($organizationName: ID!) {
            addStar(input: {starrableId: $organizationName}) {
                starrable {
                    viewerHasStarred
                }
            }
        }`;

        const { data: { data } } = await api.post('/graphql', {
            variables: {
                abc: repositoryId
            },
            query: MUTATION_ADD_START,
        })
        console.log('GraphQL Response: ', data);
    }

    useEffect(() => {
        // fetchData_ql("qutbITech")
        addStart('MDEwOlJlcG9zaXRvcnkzODc1MTIzNjA=')
    }, [])



    return (
        <div>

        </div>
    );
}

export default GithubGraphQl;
