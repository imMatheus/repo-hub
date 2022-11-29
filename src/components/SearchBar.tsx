import React from 'react'
import { useSearchParams } from 'react-router-dom'
import DropdownSuggestions from './DropdownSuggestions'

const SearchBar: React.FC = ({}) => {
    const [searchParams, setSearchParams] = useSearchParams({ query: '' })

    return (
        <>
            <p className='mb-1 text-text-gray'>
                e.x "facebook/react" or "google/angular"
            </p>
            <div className='focus-within:border-light peer mb-3 rounded border-2 border-text-gray bg-bg-gray px-5 py-3 focus-within:text-primary-light'>
                <input
                    type='text'
                    value={searchParams.get('query') as string}
                    onChange={(e) => setSearchParams({ query: e.target.value })}
                    placeholder='find your repository (e.x facebook/react)'
                    className='w-full bg-transparent outline-none placeholder:text-text-gray'
                />
            </div>
            <div className='max-h-0 overflow-hidden transition-all peer-focus-within:max-h-[700px]'>
                {searchParams.get('query') && (
                    <DropdownSuggestions
                        query={searchParams.get('query') as string}
                    />
                )}
            </div>
        </>
    )
}

export default SearchBar
