import React, { useState } from 'react';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Search term:', searchTerm);
    };

    return (
        <form onSubmit={handleSubmit} className="relative">
            <input
                type="text"
                placeholder="Route "
                value={searchTerm}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            readonly />
            <button
                type="submit"
                className="absolute right-2 top-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                Search
            </button>
        </form>
    );
}

export default SearchBar;