const { retrieve, search } = require("./searchController.js");


let readlist = [];
let booklists = [];

const checkIfRead = isbn => {
    // - called from formatBooks:
    return readlist.includes(isbn)
}

const checkIfListed = isbn => {
    // - called from formatBooks:
    let listFilter = booklists.filter(booklist => booklist.books.includes(isbn));
    let listNames = []
    listFilter.filter(booklist => listNames.push(booklist.name))
    return listNames
}

const formatBooks = bookArray => {
    const mappedBookArray = bookArray.map(book => {
        // - some search results from Google Books don't have all of these properties, which caused destructuring issues and this was the only workaround I could come up with:
        if (book.title, book.authors, book.publisher, book.description, book.description, book.industryIdentifiers, book.pageCount, book.imageLinks) {
            if (book.industryIdentifiers) {
                if (book.industryIdentifiers[0].type.includes('ISBN')){
                    let isbn_13 = book.industryIdentifiers.filter(isbnid => isbnid.type === "ISBN_13")
                    let isbn = isbn_13[0].identifier
                    return (
                        {
                            title: book.title,
                            author: book.authors,
                            publisher: book.publisher,
                            description: book.description,
                            isbn: isbn,
                            pageCount: book.pageCount,
                            covers: book.imageLinks,
                            language: book.language == 'en' ? 'en' : 'default',
                            booklists: checkIfListed(isbn),
                            read: checkIfRead(isbn)
                        }
                    )
                }
            }
        }
    })

    const filterArray = mappedBookArray.filter(book => (book))
    return filterArray
}

module.exports = {
    // CREATE:
    createBooklist: (req, res) => {
        const { isbn, booklistName } = req.body;
        const booklistNames = [];
        booklists.forEach(booklist => booklistNames.push(booklist.name));

        if (booklistNames.includes(booklistName)) {
            res.status(200).send("It looks like there is already a booklist with the name you've chosen. Please type in a unique name and click the 'Create New Booklist' button.")
        }
        else {
            let booklistFormat = {
                "name": booklistName,
                "books": isbn.length === 0 ? [] : [isbn]
            }
            booklists.push(booklistFormat)
            res.status(200).send("Accepted")
        }
    },

    addBook: (req, res) => {
        // - adds book to existing booklist ONLY:
        const { isbn, booklistName } = req.body;
        const targetList = booklists.filter(booklist => booklist.name === booklistName);
        targetList[0].books.push(isbn)
        res.status(200).send(booklists)
    },

    // READ:
    search: async (req, res) => {
        // retrieves by ISBN and search-term:
        const { term } = req.query;
        const result = await search(term);
        const formattedResult = formatBooks(result);
        res.status(200).send(formattedResult)
    },

    retrieveBooklists: async (req, res) => {
        // - used to retrieve books from a particular booklist:
        const { targetList } = req.query;
        // only used/modified in targetList === "all":
        let newBooklists = [];
        // only used/modified in targetList !== "all":
        let books = [{
            "name": "",
            "books": []
        }];
        // - if user trying to retrieve the books they've read;
        // - RETURNS SINGLE OBJECT:
        if (targetList === "readlist") {
            for (let i = 0; i < readlist.length ; i++ ) {
                books[0].name = "Read Books";
                await retrieve(readlist[i])
                .then(response => books[0].books.push(response[0].volumeInfo))
            }
        }
        // - if trying to retrieve all booklists;
        // - RETURNS ARRAY OF OBJECTS:
        else if (targetList === "all") {
            let newBooks = [];
            booklists.forEach(booklist => newBooklists.push(
                {
                    "name": booklist.name,
                    "books": []
                }
            ))
            for (let i = 0; i < booklists.length; i++) {
                for (let j = 0; j < booklists[i].books.length; j++) {
                    await retrieve(booklists[i].books[j])
                    .then(response => newBooks.push(response[0].volumeInfo))
                }
                newBooklists[i].books = newBooks;
                newBooks = [];
            }
            newBooklists.forEach(booklist => booklist.books = formatBooks(booklist.books))
        }
        // - if retrieving a specific booklist;
        // - RETURNS SINGLE OBJECT:
        else {
            let target = booklists.filter(booklist => booklist.name === targetList)
            if (target.length === 0) {
                return res.status(200).send("no matches")
            }
            else if (target[0].books.length === 0) {
                return res.status(200).send(target[0])
            }
            else {
                for (let i = 0; i < target[0].books.length ; i++ ) {
                    books[0].name = target[0].name;
    
                    await retrieve(target[0].books[i])
                    .then(response => books[0].books.push(response[0].volumeInfo))
                }
            }
        }

        books[0].books = formatBooks(books[0].books)
        books = {...books[0]}
        targetList === "all" ? res.status(200).send(newBooklists) : res.status(200).send(books)
    },

    retrieveBooklistNames: (req, res) => {
        // - utility which returns booklist names for dropdown menus;
        // - takes format param and retrieves, either all booklist names, or all names the corresponding lists of which don't include the ISBN in question (for adding books to booklists):
        const { format } = req.params;
        let booklistNames = [];
        // - for dropdowns which retrieve booklists:
        if (format === "all") {
            booklists.forEach(booklist => booklistNames.push(booklist.name))
        }
        // - for dropdown menus which retrieve non-duplicate booklists:
        else {
            const filterBooklists = booklists.filter(booklist => !booklist.books.includes(format))
            filterBooklists.forEach(booklist => booklistNames.push(booklist.name))
        }
        res.status(200).send(booklistNames)
    },

    // - UPDATE:
    toggleRead: (req, res) => {
        // - pushes or splices readlist depending on what user ends up toggling:
        const { isbn } = req.body;
        if (readlist.includes(isbn)) {
            readlist.splice(readlist.indexOf(isbn), 1)
            return res.status(200).send('removed')
        }
        else {
            readlist.push(isbn)
            return res.status(200).send('added')
        }
    },

    // - DELETE:
    removeBooklist: (req, res) => {
        const { booklistName } = req.query;
        booklists = booklists.filter(booklist => booklist.name !== booklistName)
        res.status(200).send(`Booklist ${ booklistName } deleted!`);
    },

    removeBook: (req, res) => {
        // - removes book from target booklist:
        const { isbn, booklistName } = req.query;
        const targetList = booklists.filter(booklist => booklist.name === booklistName);
        const targetListBooks = targetList[0].books;
        if (targetList[0].books.includes(isbn)) {
            const idx = targetListBooks.indexOf(isbn);
            targetListBooks.splice(idx, 1)
            res.status(200).send(booklists)
        }
    },

    // - DEBUG !!! REMOVE BEFORE FINAL PUSH !!!
    test: (req, res) => {
        res.status(200).send(booklists)
    }
}