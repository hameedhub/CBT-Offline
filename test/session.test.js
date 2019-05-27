import chai, { expect } from 'chai';
import app from '../app';
import chaiHttp from 'chai-http';
import '@babel/polyfill';
chai.use(chaiHttp);

/**
 * test for question
 * @function describe { event } 
 * @function before { event }
 * @function post { params } url
 * @function send { params } details
 * @function end { callback } 
 * @function request { object } application
 * @function done { end }
 * @params err { object } error 
 * @params res { object } response
 * 
 */

 describe('Session Route', ()=>{
    it('should be add session', (done)=>{
        chai.request(app)
        .post('/api/v1/session/00-00-00')
        .send({
            studentId: '123',
            name: 'Code',
            subject: "test",
            class: "test1",
            term: "test"
        })
        .end((err, res)=>{
            expect(res.body).to.be.an('object');
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('token');
            expect(res.body).to.have.property('message');
            done();
        })
    })
    it('should be send error if date not correct', (done)=>{
        chai.request(app)
        .post('/api/v1/session/00-00-01')
        .send({
            studentId: '123',
            name: 'Code',
            subject: "test",
            class: "test1",
            term: "test"
        })
        .end((err, res)=>{
            expect(res.body).to.be.an('object');
            expect(res).to.have.status(404);
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('error');
            done();
        })
    })
    it('should send error if subject not correct', (done)=>{
        chai.request(app)
        .post('/api/v1/session/00-00-00')
        .send({
            studentId: '123',
            name: 'Code',
            subject: "test1",
            class: "test1",
            term: "test"
        })
        .end((err, res)=>{
            expect(res.body).to.be.an('object');
            expect(res).to.have.status(404);
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('error');
            done();
        })
    })
 })