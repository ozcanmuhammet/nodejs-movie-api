const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaiHttp);

let token, movieId;

describe('/api/movies tests', () => {
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({ username: 'mumi', password: '12345' })
            .end((err, res) => {
                token = res.body.token;
                done();
            })
    })

    describe('/GET movies', () => {
        it('it should get all the movies', (done) => {
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        });
    })

    describe('/POST movies', () => {
        it('it should post a movie', (done) => {
            const movie = {
                title: 'Udemy',
                directorId: '5c97702e8274e342f8abfd04',
                category: 'crime',
                country: 'TR',
                year: 2000,
                imdbScore: 7
            };

            chai.request(server)
                .post('/api/movies')
                .send(movie)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('directorId');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdbScore');
                    movieId = res.body._id;
                    done();
                })
        });
    })

    describe('/GET/:movieId movies', () => {
        it('it should get a movie by given id', (done) => {
            chai.request(server)
                .get('/api/movies/' + movieId)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('directorId');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdbScore');
                    res.body.should.have.property('_id').eql(movieId);
                    done();
                })
        });
    })

    describe('/PUT/:movieId movies', () => {
        it('it should update a movie by given id', (done) => {
            const movie = {
                title: 'Udemy2',
                directorId: '5c97702e8274e342f8abfd02',
                category: 'crime2',
                country: 'TR2',
                year: 2001,
                imdbScore: 7.2
            };

            chai.request(server)
                .put('/api/movies/' + movieId)
                .send(movie)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title').eql(movie.title);
                    res.body.should.have.property('directorId').eql(movie.directorId);
                    res.body.should.have.property('category').eql(movie.category);
                    res.body.should.have.property('country').eql(movie.country);
                    res.body.should.have.property('year').eql(movie.year);
                    res.body.should.have.property('imdbScore').eql(movie.imdbScore);
                    res.body.should.have.property('_id').eql(movieId);
                    done();
                })
        });
    })

    describe('/DELETE/:movieId movies', () => {
        it('it should delete a movie by given id', (done) => {

            chai.request(server)
                .delete('/api/movies/' + movieId)
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