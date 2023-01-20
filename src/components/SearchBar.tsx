import React, { useRef, useState } from 'react'
import DropdownSuggestions from './DropdownSuggestions'

const SearchBar: React.FC = ({}) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [query, setQuery] = useState('')

    return (
        <>
            <p className='mb-1 text-text-gray'>
                {`e.x "facebook/react" or "google/angular"`}
            </p>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    if (inputRef.current) {
                        setQuery(inputRef.current.value)
                    }
                }}
                className='focus-within:border-light peer mb-3 rounded border-2 border-text-gray bg-bg-gray px-5 py-3 focus-within:text-primary-light'
            >
                <input
                    type='text'
                    ref={inputRef}
                    placeholder='find your repository (e.x facebook/react)'
                    className='w-full bg-transparent outline-none placeholder:text-text-gray'
                />
            </form>
            <div className='max-h-0 overflow-hidden transition-all hover:max-h-[700px] peer-focus-within:max-h-[700px] '>
                {query && <DropdownSuggestions query={query} />}
            </div>
        </>
    )
}

export default SearchBar
