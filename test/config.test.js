import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import '@babel/polyfill';
import app from '../app';

chai.use(chaiHttp);
/**
 * @params
 */
describe('Init Test', ()=>{
    it('should welcome use to the API', (done)=>{
    chai.request(app)
    .get('/')
    .end((err, res)=>{
        expect(res).to.be.an('object');
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        done()
     })
    })
    it('should send 404 error when no route found', (done)=>{
        chai.request(app)
        .post('/api/login')
        .end((err, res)=>{
            expect(res).to.be.an('object');
            expect(res).to.have.status(404);
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('error');
            done();
        })
    })
    it('should be able to login user', (done)=>{
        chai.request(app)
        .post('/api/v1/start')
        .send({
            username:'test',
            password:'test',
            date:'2012-10-10'
        })
        .end((err, res)=>{
            expect(res).to.be.an('object');
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('message');
            done();
        })
    })
    it('should send 422 wrong data entered', (done)=>{
        chai.request(app)
        .post('/api/v1/start')
        .send({
            username:'test',
            password:'test',
        })
        .end((err, res)=>{
            expect(res).to.be.an('object');
            expect(res).to.have.status(422);
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('error');
            done();
        })
    })
})