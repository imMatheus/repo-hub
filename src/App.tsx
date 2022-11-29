import './App.css'
import RepositoryGraph from './components/RepositoryGraph'
import SearchBar from './components/SearchBar'

function App() {
    return (
        <div className='px-4 py-10'>
            <section className='mx-auto max-w-5xl'>
                <div className='mb-5 md:mb-8'>
                    <h1 className='mb-2 text-2xl font-black uppercase tracking-wider md:text-4xl'>
                        Repo hub
                    </h1>
                    <p className='text-text-gray'>
                        See the proggress of diffrent repos from start to finish
                    </p>
                </div>

                <SearchBar />
                <RepositoryGraph />
            </section>
        </div>
    )
}

export default App
