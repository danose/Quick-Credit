import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../server';
 

const { expect } = chai;
chai.use(chaiHttp);

const loanUrl = '/api/v1/loans';
const loan = {

  loanId: 1,
  tenor: '3',
  amount: 10000.00

};


describe('Loans', () => {
  
  // Test Loan Creation
  describe('create loan', () => {

    it('should create a loan with correct requirements', () => {

      chai.request(app).post(loanUrl)
        .send(loan)
        .end((err, res) => {

          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          
          expect(res.body.data.firstName).to.be.a('string');
          
          expect(res.body.data).to.have.property('balance');
         
          expect(res.body.data.lastName).to.be.a('string');
          expect(res.body.data.email).to.be.a('string');
          expect(res.body.data.address).to.be.a('string');
         
        });

    });
    it('should not create loan with tenor less than 1', () => {

      chai.request(app).post({

        loanId: 1,
        tenor: '-3',
        amount: 10000.00

        
      })
        .send(loan)
        .end((err, res) => {

          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          
          expect(res.body.error.tenor).to.include('tenor should be between 1 and 12');
          
        
        });

    });
    it('should not create loan with tenor more than 12', () => {

      chai.request(app).post({

        loanId: 1,
        tenor: '14',
        amount: 10000.00

        
      })
        .send(loan)
        .end((err, res) => {

          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          
          expect(res.body.error.tenor).to.include('tenor should be between 1 and 12');
          
        
        });

    });
    it('should not create loan with amount less than 10000', () => {

      chai.request(app).post({

        loanId: 1,
        tenor: '1',
        amount: 100.00

        
      })
        .send(loan)
        .end((err, res) => {

          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          
          expect(res.body.error.amount).to.include('loan amount should be between 10000 to 200000');
          
        
        });

    });
    it('should not create loan with empty tenor', () => {

      chai.request(app).post({

        loanId: 1,
        tenor: '',
        amount: 5000000.00

        
      })
        .send(loan)
        .end((err, res) => {

          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          
          expect(res.body.error.tenor).to.include('tenor is required');
          
        
        });

    });
    it('should not create loan with empty amount', () => {

      chai.request(app).post({

        loanId: 1,
        tenor: '3',
        amount: ''

        
      })
        .send(loan)
        .end((err, res) => {

          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          
          expect(res.body.error.amount).to.include('loan amount is required');
          
        
        });

    });

 
  });

  describe('get all loans', () => {

    it('should return all loans', () => {

      chai.request(app).get(loanUrl)
        .end((err, res) => {

          expect(res).to.have.status(200);


        });

    });
    it('should return an array', () => {

      chai.request(app).get(loanUrl)
        .end((err, res) => {

          expect(res.body).to.be.an('array');

        });

    });
    it('should return an empty array on start', () => {

      chai.request(app).get(loanUrl)
        .end((err, res) => {

          expect(res.body).to.have.length(0);

        });

    });

      
  });

  describe('get a single loan', () => {

    it('should return one loan', async () => {

      const res = await chai.request(app).get(`${loanUrl}/1`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');


    });
    it('should not get a loan with wrong id', async () => {

      const res = await chai.request(app).get(`${loanUrl}/78`);
      expect(res.status).to.equal(404);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.include('loan not found');


    });

  
  });

  describe('get all unpaid loans', () => {

    it('it should get all unpaid loans', async () => {

      const res = await chai.request(app).get(`${loanUrl}?status=approved&repaid=false`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.data.status).to.include('approved');


    });
    it('it should not get all unpaid loans with incorrect query string', async () => {

      const res = await chai.request(app).get(`${loanUrl}?status=rejected&repaid=false`);
      expect(res.status).to.equal(404);
     
      expect(res.body.error).to.include('unpaid loans not found');
      

    });

  });

  describe('approve/reject loan applications', () => {

    it('it should approve loans', async () => {

      const res = await chai.request(app).patch(`${loanUrl}/1`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.data.status).to.include('approved');


    });
    it('it should reject loans', async () => {

      const res = await chai.request(app).patch(`${loanUrl}/1`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.data.status).to.include('rejected');
      

    });
    it('it should not approve/reject loans with incorrect id', async () => {

      const res = await chai.request(app).patch(`${loanUrl}/9`);
      expect(res.status).to.equal(404);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.include('loan not found');
      

    });


  });
  describe('get all repaid loans', () => {

    it('it should get all repaid loans', async () => {

      const res = await chai.request(app).get(`${loanUrl}?status=approved&repaid=true`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.data.status).to.equal('approved');


    });
    it('it should not get all repaid loans with incorrect query string', async () => {

      const res = await chai.request(app).get(`${loanUrl}?status=rejected&repaid=true`);
      expect(res.status).to.equal(404);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.include('repaid loans not found');
      

    });

  });

  
});
