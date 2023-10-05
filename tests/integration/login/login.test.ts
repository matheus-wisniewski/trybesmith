import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import UserModel from '../../../src/database/models/user.model'
import app from '../../../src/app';

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Testa se a função retorna o cógido esperado quando utilizado as credenciais corretas', async function () {
    // Arrange
    const body = { username: 'username', password: 'sortudo' };
    
    // Act
    sinon.stub(UserModel, 'findOne').resolves(UserModel.build({
      id: 1,
      username: 'username',
      password: '$2a$10$ybRUU3Xn7bNpHcnMKVDF0eKBkd8EHFgRzke5uiVmkKrFNElPA1Nqe',
      vocation: 'CTO',
      level: 9
    }));

    // Assert
    const response = await chai.request(app).post('/login').send(body);
    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('token');
  });

  it('Testa se a função retorna um código de erro se tentar fazer login com usuário errado', async function () {
    // Arrange
    const body = { username: 'username', password: 'senhasegura' };
    
    // Act
    sinon.stub(UserModel, 'findOne').resolves(null);
    
    // Assert
    const response = await chai.request(app).post('/login').send(body); 
    expect(response.status).to.be.equal(401);
  });

  it('Testa se a função retorna um código de erro se tentar fazer login com senha errada', async function () {
    // Arrange
    const body = { username: 'username', password: 'senhasegura' };

    // Act
    sinon.stub(UserModel, 'findOne').resolves(UserModel.build({
      id: 1,
      username: 'username',
      password: '$2a$10$ybRUU3Xn7bNpHcnMKVDF0eKBkd8EHFgRzke5uiVmkKrFNElPA1Nqe',
      vocation: 'CTO',
      level: 9
    }));

    // Assert
    const response = await chai.request(app).post('/login').send(body);
    expect(response.status).to.be.equal(401);
  })
});
