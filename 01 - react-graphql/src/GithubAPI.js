import { useEffect, useState } from 'react'
import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.github.com'
});

function GithubAPI() {

    const [userData, setUserData] = useState(null)
    const [userRepos, setUserRepos] = useState(null)

    useEffect(() => {

        (async() => {
            const user = await api.get('/users/uqutub')
            setUserData(user.data);

            const repo = await api.get('/users/uqutub/repos')
            setUserRepos(repo.data);
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
