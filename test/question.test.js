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


describe('Question Entry Point', ()=>{
    before('It should be login', (done)=>{
        chai.request(app)
        .post('/api/v1/start')
        .send({
            username: "test",
            password: "test",
            date: "00-00-00"
        })
        .end((err, res)=>{
            done();
        })
    })
    it('should be able to accept save data',(done)=>{
        chai.request(app)
        .post('/api/v1/question')
        .send({
            subject: "test",
            class: "test1",
            term: "test",
            date: "00-00-00",
            questions: [{test: "test"}]
        })
        .end((err, res)=>{
            expect(res.body).to.be.an('object');
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('path');
            done();
        })
    })
    it('should return error if date not define', (done)=>{
        chai.request(app)
        .post('/api/v1/question')
        .send({
            subject: "test",
            class: "test1",
            term: "test",
            questions: [{test: "test"}]
        })
        .end((err, res)=>{
            expect(res.body).to.be.an('object');
            expect(res).to.have.status(422);
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('error');
            done();
        })
    })
    it('should be able to view question', (done)=>{
        chai.request(app)
        .post('/api/v1/question/view')
        .send({
            subject: "test",
            class: "test1",
            term: "test",
            date: "00-00-00"
        })
        .end((err, res)=>{
            expect(res.body).to.be.an('object');
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('question');
            done();
        })
    })
    it('should be return error if file not found', (done)=>{
        chai.request(app)
        .post('/api/v1/question/view')
        .send({
            subject: "test",
            class: "test0",
            term: "test0",
            date: "00-00-00"
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
