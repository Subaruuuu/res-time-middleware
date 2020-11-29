const express = require('express')
const app = express()
const port = 3000
// const responseTime = require('response-time')


const differentTime = (req, res, next) => {
  let startTime = Date.now()
  // console.log(startTime)
  let reqTime = new Date(startTime).toLocaleString().replace(/T/, ' ').replace(/\..+/, '')
  console.log('Request time:', reqTime)

  let finishTime
  res.on("finish", () => {
    finishTime = Date.now()
    // console.log(finishTime)
    let resTime = new Date(finishTime).toLocaleString().replace(/T/, ' ').replace(/\..+/, '')
    console.log('Respond time:', resTime)
    let different = finishTime - startTime
    console.log(reqTime, '|', req.method, 'From', req.path + '|' + 'total time:' + different + 'ms')
  })
  next()
}


app.use(differentTime)

app.get('/', (req, res) => {
  res.send('列出全部 Todo')
})

app.get('/new', (req, res) => {
  res.send('新增 Todo 頁面')
})

app.get('/:id', (req, res) => {
  res.send('顯示一筆 Todo')
})

app.post('/', (req, res) => {
  res.send('新增一筆  Todo')
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})