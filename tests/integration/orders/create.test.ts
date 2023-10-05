import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import OrderModel from '../../../src/database/models/order.model';
import app from '../../../src/app';
import UserModel from '../../../src/database/models/user.model';

chai.use(chaiHttp);

describe('POST /orders', function () { 
  beforeEach(function () { sinon.restore(); });
  it('Testa se a função retorna um erro ao criar um pedido sem o id do usuário', async function () {
    // Arrange
    const body = { productIds: [ 1, 2 ] };
    // Act
    const response = await chai.request(app).post('/orders').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkhhZ2FyIiwiaWF0IjoxNjk2MDkxNTI5fQ.sn0EoRoHYZvi36ggbvuO44FBsxOLGS-TsKzk3NeKDDc').send(body);
    // Assert
    expect(response.status).to.be.equal(400);
  });

  it('Testa se a função retorna um erro ao criar um pedido com o tipo de id errado', async function () {
    // Arrange
    const body = { productIds: [ 1, 2 ], userId: 'user' };
    // Act
    const response = await chai.request(app).post('/orders').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkhhZ2FyIiwiaWF0IjoxNjk2MDkxNTI5fQ.sn0EoRoHYZvi36ggbvuO44FBsxOLGS-TsKzk3NeKDDc').send(body);
    // Assert
    expect(response.status).to.be.equal(422);
  });

  it('Testa se a função retorna um erro ao tentar criar um pedido com o usuário errado', async function () {
    // Arrange
    const body = { productIds: [ 1, 2 ], userId: 777777 };
    // Act
    sinon.stub(UserModel, 'findOne').resolves(null);
    const response = await chai.request(app).post('/orders').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkhhZ2FyIiwiaWF0IjoxNjk2MDkxNTI5fQ.sn0EoRoHYZvi36ggbvuO44FBsxOLGS-TsKzk3NeKDDc').send(body);
    // Assert
    expect(response.status).to.be.equal(404);
  });

  it('Testa se a função retorna um erro ao tentar cadastrar um pedido sem um array de itens', async function () {
    // Arrange
    const body = { userId: 1 };
    // Act
    sinon.stub(UserModel, 'findOne').resolves(UserModel.build({ id: 2, level: 2, password: '2', username: '2', vocation: '2'}))
    const response = await chai.request(app).post('/orders').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkhhZ2FyIiwiaWF0IjoxNjk2MDkxNTI5fQ.sn0EoRoHYZvi36ggbvuO44FBsxOLGS-TsKzk3NeKDDc').send(body);
    // Assert
    expect(response.body).to.be.deep.equal({ message: '"productIds" is required' });
  });

  it('Testa se a função retorna um erro ao tentar cadastrar um pedido com um array de itens vazio', async function () {
    // Arrange
    const body = { userId: 1, productIds: [] };
    // Act
    sinon.stub(UserModel, 'findOne').resolves(UserModel.build({ id: 3, level: 3, password: '3', username: '3', vocation: '3'}))
    const response = await chai.request(app).post('/orders').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkhhZ2FyIiwiaWF0IjoxNjk2MDkxNTI5fQ.sn0EoRoHYZvi36ggbvuO44FBsxOLGS-TsKzk3NeKDDc').send(body);
    // Assert
    expect(response.body).to.be.deep.equal({ message: '"productIds" must include only numbers' });
  });
});
