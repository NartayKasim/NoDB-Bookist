const axios = require('axios')
// const { formatSearchResults } = require('./booklistController.js')
// - imported to create read and booklist property values for all searched books
// const booklistController = require('./booklistController.js')
// - not sure if this is secure?
const googleBooksKey = 'AIzaSyB8-mFYMot9BU9YbPcLO5jj8ok9LjQ9B7I'

// - final array of formatted search results, which is sent out to JSX
// - forgot why I made this into a separate variable; too scared to delete it...
let filterResult = []

module.exports = {
    search: async formattedSearchTerm => {
        const result = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${ formattedSearchTerm }&key=${ googleBooksKey }&maxResults=40`)
        return result.data.items.map(book => book.volumeInfo)
    },
    
    retrieve: async isbn => {
        const book = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${ isbn }`).then(response => response.data.items)
        return book
    }
}