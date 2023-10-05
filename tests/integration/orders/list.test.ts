import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import OrderModel from '../../../src/database/models/order.model';
import ProductModel from '../../../src/database/models/product.model';
import ordersMock from '../../mocks/orders.mock';

chai.use(chaiHttp);

describe('GET /orders', function () { 
  beforeEach(function () { sinon.restore(); });
  it ('Testa se a função retorna o código esperado e uma lista de novos pedidos', async function () {
    // Arrange
    const { mockFromDb, mockResponse } = ordersMock;
    // Act
    sinon.stub(OrderModel, 'findAll').resolves(OrderModel.bulkBuild(mockFromDb, { include: [{ model: ProductModel, as: 'productIds', attributes: ['id'] }]}));
    const response = await chai.request(app).get('/orders');
    // Assert
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(mockResponse);
  });
});
