import React from 'react'
import RepositoryGraph from '../components/RepositoryGraph'
import SearchBar from '../components/SearchBar'

const Home: React.FC = ({}) => {
    return (
        <div>
            <SearchBar />
            <RepositoryGraph />
        </div>
    )
}

export default Home
