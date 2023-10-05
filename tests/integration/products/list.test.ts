import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('GET /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it ('Testa se a função retorna um array de objetos com todos os produtos', async function () {
    // Arrange
    // Act
    sinon.stub(ProductModel, 'findAll').resolves([ProductModel.build({ id: 1, name: "Excalibur", price: "10 peças de ouro", orderId: 1 }), ProductModel.build({ id: 2, name: "Espada Justiceira", price: "20 peças de ouro", orderId: 1 })]);
    const response = await chai.request(app).get('/products');
    // Assert
    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.deep.equal([{ id: 1, name: "Excalibur", price: "10 peças de ouro", orderId: 1 }, { id: 2, name: "Espada Justiceira", price: "20 peças de ouro", orderId: 1 }]);
  });
});
