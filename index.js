require('dotenv').config();
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;
const booksRouter = require('./routes/booksRouter')

app.use(express.json());

app.use('/api/books', booksRouter)

app.get('/api', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
