let express = require('express')
let port = process.env.port || 3001
let app = express()
app.listen(port, () => {
    console.log(`Server working in port ${port}`)
})