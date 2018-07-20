var express = require('express')
var app = express()
const moment = require('moment');

app.use('/', function(req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
})
  
// / - Home
app.get('/', (req, res) => res.send('Hello World!'))

app.get('/api/timestamp', function(req, res) {
    let date = new Date()
    const addZero = (value) => {
        return '0' + value
    }

    // year
    let year = date.getFullYear()
    
    // month
    let month = date.getMonth() + 1
    if (month < 10) month = addZero(month)

    // day
    let day = date.getDate()
    if (day < 10) day = addZero(day)
    
    let format = `${year}-${month}-${day}`
    res.redirect(`/api/timestamp/${format}`)
})

// /api/
app.get('/api/timestamp/:date', (req, res, next) => {
    const date = req.params.date
    const match = date.match(/(\d{4})-(\d{2})-(\d{2})/)
    
    if (match === null) {
        res.json({"error" : "Invalid Format" })
        return
    }

    let dateObj = new Date(date)
    res.json({
        unix: dateObj.getTime(),
        utc: dateObj.toUTCString()
    })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))