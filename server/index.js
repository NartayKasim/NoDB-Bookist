const express = require('express');
const app = express();
const booklistController = require('./controllers/booklistController.js')
const cheerio = require('cheerio');
const cors = require('cors');

const PORT = 5009;

app.use( express.json() )
app.use( cors() )

app.listen(PORT, () => console.log(PORT))

// - create booklist (body = ISBN (conditional), BooklistName):
app.post('/api/booklists/create/', booklistController.createBooklist);

// - add book to existing playlists (body = ISBN, booklistName):
app.post('/api/booklists/addbook/', booklistController.addBook);

// - primary search controller (query = term):
app.get('/api/search', booklistController.search);

// - utility booklist retrieval (query = all, readlist, listName):
app.get('/api/booklists/list', booklistController.retrieveBooklists) 

// retrieves booklist names (query = all, ISBN):
app.get('/api/booklists/dropdowns/:format', booklistController.retrieveBooklistNames)

// - flips read property and manages readlist array (body = ISBN):
app.put('/api/booklists/update/', booklistController.toggleRead) 

// - remove booklist from booklists array (body = booklistName):
app.delete('/api/booklists/remove/', booklistController.removeBooklist) 

// - remove book from booklists array (body = ISBN, booklistName):
app.delete('/api/booklists/removebook', booklistController.removeBook)




app.get('/api/test/', booklistController.test)

// - utility update state mw for bookcard updating:
// app.get('/api/booklists/update/:isbn', booklistController.updateBooklists); 

// - utility dropdown state mw for AddBook component:
// app.get('/api/booklists/choices/:isbn', booklistController.dropdownFormat); 


















// AMAZON SCRAPER: mostly me just trying a hundred different things until one of them works in a reliable manner
// const test = async () => {
//     const html = await axios.get('https://www.amazon.com/Stuff-and-Nonsense-Andrew-Seiple-audiobook/dp/B07D3CHGXL/ref=sr_1_1?dchild=1&keywords=stuff+and+nonsense&qid=1617651042&s=audible&sr=1-1')

//     const $ = await cheerio.load(html.data);
//     const output = $('span.a-color-base').text()
//     const a = output.split()
//     const b = (a[0].slice(0, 60))
//     if (b.includes("Kindle")) {
//         console.log('Kindle Available')
//     }

//     if (b.includes("Audible")) {
//         console.log('Audible Available')
//     }
//     else {
//         console.log('NO AUDIBLE FORMAT')
//     }

//     if (b.includes("Paperback")) {
//         console.log("Paperback Available")
//     }
//     else {
//         console.log("NO PAPERBACK FORMAT")
//     }

//     if (b.includes("Hardcover")) {
//         console.log("Hardcover Available")
//     }
//     else {
//         console.log("NO HARDCOVER FORMAT")
//     }
// }

// test()

