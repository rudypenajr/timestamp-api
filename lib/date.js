const getDate = (date) => {
    if (!date) return new Date()
    
    return new Date(date)
}

const addZero = (value) => {
    return '0' + value
}

const formatDate = (date) => {
    // year
    let year = date.getFullYear()
        
    // month
    let month = date.getMonth() + 1
    if (month < 10) month = addZero(month)

    // day
    let day = date.getDate()
    if (day < 10) day = addZero(day)

    // let format = `${year}-${month}-${day}`
    return `${year}-${month}-${day}`
}

module.exports = { getDate, formatDate }