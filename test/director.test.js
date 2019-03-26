const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaiHttp);

let token, directorId;

describe('/api/directors tests', () => {
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({ username: 'mumi', password: '12345' })
            .end((err, res) => {
                token = res.body.token;
                done();
            })
    })

    describe('/GET directors', () => {
        it('it should get all the directors', (done) => {
            chai.request(server)
                .get('/api/directors')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        });
    })

    describe('/POST directors', () => {
        it('it should post a director', (done) => {
            const director = {
                name: 'test',
                surname: 'test',
                bio: 'test'
            };

            chai.request(server)
                .post('/api/directors')
                .send(director)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('surname');
                    res.body.should.have.property('bio');
                    directorId = res.body._id;
                    done();
                })
        });
    })

    describe('/GET/:directorId directors', () => {
        it('it should get a director by given id', (done) => {
            chai.request(server)
                .get('/api/directors/' + directorId)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    //    res.body.should.have.property('name');
                    //    res.body.should.have.property('surname');
                    //    res.body.should.have.property('bio');
                    //    res.body.should.have.property('_id').eql(directorId);
                    done();
                })
        });
    })

    describe('/PUT/:directorId movies', () => {
        it('it should update a director by given id', (done) => {
            const director = {
                name: 'test2',
                surname: 'test2',
                bio: 'test2'
            };

            chai.request(server)
                .put('/api/directors/' + directorId)
                .send(director)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql(director.name);
                    res.body.should.have.property('surname').eql(director.surname);
                    res.body.should.have.property('bio').eql(director.bio);
                    res.body.should.have.property('_id').eql(directorId);
                    done();
                })
        });
    })

    describe('/DELETE/:directorId movies', () => {
        it('it should delete a director by given id', (done) => {

            chai.request(server)
                .delete('/api/directors/' + directorId)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(1);
                    done();
                })
        });
    })

});