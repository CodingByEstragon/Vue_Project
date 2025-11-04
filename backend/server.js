const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const articleRoutes = require('./routes/articles');
app.use('/api/articles', articleRoutes);

app.listen(port, () => {
  console.log(`Backend läuft auf http://localhost:${port}`);
});