var express = require('express')
var app = express()
var { getDate, formatDate } = require('./lib/date')

app.use('/', function(req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
})
  
// / - Home
app.get('/', (req, res) => res.send('Hello World!'))

app.get('/api/timestamp', function(req, res) {
    let date = getDate()
    let format = formatDate(date)
    res.redirect(`/api/timestamp/${format}`)
})

// /api/
app.get('/api/timestamp/:date', (req, res, next) => {
    const date = req.params.date
    const match = date.match(/(\d{4})-(\d{2})-(\d{2})/)
    
    // handle invalid date formats
    if (match === null) {
        res.json({"error" : "Invalid Format" })
        return
    }

    let dateObj = getDate(date)
    res.json({
        unix: dateObj.getTime(),
        utc: dateObj.toUTCString()
    })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))