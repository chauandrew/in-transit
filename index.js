const express = require("express");
const cors = require('cors')
const path = require('path');
const port = process.env.PORT || 4000;

const app = express(); // create express app
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.set('port', port);

const reactBuildPath = path.join(__dirname + '/client/dist/index.html')

// Static React Routing
app.use(express.static(path.join(__dirname, '/client/dist')))
app.get('/', (_, res) => { res.sendFile(reactBuildPath); })
app.get('/all', (_, res) => { res.sendFile(reactBuildPath); })
app.get('/filter/*', (_, res) => { res.sendFile(reactBuildPath); })


// Backend calls under /server/routes/index
const routes = require('./server/api/index');
app.use("/", routes)

// start express server
app.listen(port, () => {
  console.log(`server started on port ${port}`);
})