import { useEffect, useState } from 'react'
import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.github.com'
});

function GithubAPI() {

    const [userData, setUserData] = useState(null)
    const [userRepos, setUserRepos] = useState(null)

    // componentDidMount
    useEffect(() => {

        // Immediately Invoked Function Expression - IIFE
        (async () => {
            const { data: user } = await api.get('/users/uqutub')
            console.log('user ', user)
            setUserData(user);      // update state of the userData

            const { data: repo } = await api.get('/users/uqutub/repos')
            console.log('repos: ', repo)
            setUserRepos(repo);     // update state of the userRepos
        })()

    }, [])

    return (
        <div>
            <pre>
                {userData && JSON.stringify(userData, null, 4)}
            </pre>
            <hr />
            <pre>
                {userRepos && JSON.stringify(userRepos, null, 4)}
            </pre>
        </div>
    );
}

export default GithubAPI;
