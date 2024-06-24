const express = require('express');
const app = express();
const PORT = process.env.port || 8000;
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConnect = require('./config/dbConnect.js');

let corsOptions = {
  origin: '*',
  credential: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});

/* list */
app.get('/api/list', (req, res) => {
  const userQuery = `select IDX, TITLE, CONTENT, CREATED_BY, DATE_FORMAT(CREATED_AT, '%Y-%m-%d') as CREATED_AT from test_board;`;

  dbConnect.query(userQuery, (err, result) => {
    res.send(result);
  });
});

/* create */
app.post('/api/write', (req, res) => {
  const title = req.body.text.title;
  const writer = req.body.text.writer;
  const content = req.body.text.content;

  const userQuery = `insert into test_board (TITLE, CONTENT, CREATED_BY) value (?, ?, ?);`;

  dbConnect.query(userQuery, [title, content, writer], (err, result) => {
    res.send(result);
  });
});

/* read */
app.post('/api/view/:idx', (req, res) => {
  const idx = req.params.idx;

  const userQuery = `select IDX, TITLE, CONTENT, CREATED_BY, DATE_FORMAT(CREATED_AT, '%Y-%m-%d') as CREATED_AT from test_board where IDX=?;`;

  dbConnect.query(userQuery, idx, (err, result) => {
    res.send(result);
  });
});

/* update */
app.put('/api/edit/:idx', (req, res) => {
  const value = [
    req.body.text.title,
    req.body.text.content,
    req.body.text.writer,
    req.params.idx,
  ];

  const userQuery = `update test_board set TITLE = ?, CONTENT = ?, CREATED_BY = ? where IDX = ?;`;

  dbConnect.query(userQuery, value, (err, result) => {
    res.send(result);
  });
});

/* delete */
app.post('/api/delete/:idx', (req, res) => {
  const idx = req.params.idx;

  const userQuery = `delete from test_board where IDX = ?;`;

  dbConnect.query(userQuery, idx, (err, result) => {
    res.send(result);
  });
});
