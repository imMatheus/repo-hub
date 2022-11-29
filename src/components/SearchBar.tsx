import React, { useState } from 'react'
import { useRouter } from 'next/router'
import DropdownSuggestions from './DropdownSuggestions'

const SearchBar: React.FC = ({}) => {
    const router = useRouter()
    const { query } = router.query

    const [searchParams, setSearchParams] = useState('')

    return (
        <>
            <p className='mb-1 text-text-gray'>
                {`e.x "facebook/react" or "google/angular"`}
            </p>
            <div className='focus-within:border-light peer mb-3 rounded border-2 border-text-gray bg-bg-gray px-5 py-3 focus-within:text-primary-light'>
                <input
                    type='text'
                    value={searchParams}
                    onChange={(e) => setSearchParams(e.target.value)}
                    placeholder='find your repository (e.x facebook/react)'
                    className='w-full bg-transparent outline-none placeholder:text-text-gray'
                />
            </div>
            <div className='max-h-0 overflow-hidden transition-all peer-focus-within:max-h-[700px]'>
                {searchParams && <DropdownSuggestions query={searchParams} />}
            </div>
        </>
    )
}

export default SearchBar
