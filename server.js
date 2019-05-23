/* eslint-disable eol-last */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable global-require */
import express from 'express';
import path from 'path';
import expressApiVersioning from 'express-api-versioning';
import '@babel/polyfill';

const app = express();
app.use(express.json());

// Root handler
app.get('/', (req, res) => res.status(200)
  .json({
    status: 200,
    data: 'WELCOME TO QUICK CREDIT APP'
  }));

// api URL versioning
app.use(expressApiVersioning({
  apiPath: path.join(__dirname, './api'), // absolute path to the api directory
  test: /\/api\/(v[0-9]+).*/, // regular expression to get the version number from the url
  entryPoint: 'index.js', // entry point exports a function which takes an instance of express as parameter.
  instance: app // passes an instance of express to the entry point
}, (error, req, res, next) => {
  if (error && error.code !== 104){
    return res.status(500).send({ message: error.message });
  }
  next();
}));


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listening on port${port}`));


export default app;