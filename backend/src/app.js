const express = require("express");
var cors = require('cors');
const server = express();
server.use(express.json());


server.use(cors());
server.use(require('./routers/index'));

server.use(async (req, res) => {
  res.status(501).json({
    type: 'Not Implemented Error',
    statusCode: 501,
    message: `wrong path: ${req.originalUrl}`,
  });
});

server.listen(process.env.PORT, () => {
  console.log(`server start at port ${process.env.PORT}`);
});