/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
import bodyParser from 'body-parser';


export default (app) => {

  app.get('/api/v1/test', (req, res) => {
    res.send('hello');
  });

  app.use(bodyParser.json());                                     
  app.use(bodyParser.urlencoded({ extended: false }));               

};
