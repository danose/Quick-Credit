import bodyParser from 'body-parser';
import users from './routes/users';
import loans from './routes/loans';
import repayment from './routes/repayment';

export default (app) => {

  // Pare the body of incoming routes
  app.use('/api/v1', users);
  app.use('/api/v1', loans);
  app.use('/api/v1', repayment);


  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({ extended: false }));

  
};
