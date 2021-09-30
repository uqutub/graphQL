import { useEffect, useState } from 'react'
import axios from 'axios'       // for API Calling

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
            const { data: user } = await api.get('/users/uqutub')           // user Data
            console.log('user ', user)
            setUserData(user);      // update state of the userData

            const { data: repo } = await api.get('/users/uqutub/repos')
            console.log('repos: ', repo)
            setUserRepos(repo);     // update state of the userRepos        // user repos
        })()

    }, [])

    return (
        <div>
            User Data
            <pre>
                {userData && JSON.stringify(userData, null, 4)}
            </pre>
            <hr />
            User Repo Data
            <pre>
                {userRepos && JSON.stringify(userRepos, null, 4)}
            </pre>
        </div>
    );
}

export default GithubAPI;
