import bodyParser from 'body-parser';
import users from './routes/users';

export default (app) => {

  app.use('/api/v1', users);

  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({ extended: false }));
                 

};
