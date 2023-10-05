import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });
  it ('Testa se a função retorna o código 201 com um novo objeto', async function () {
    // Arrange
    const body = { name: 'product', price: '1323', orderId: 1 };
    // Act
    sinon.stub(ProductModel, 'create').resolves(ProductModel.build({ id: 1, name: 'product', price: '1323', orderId: 1}));
    const response = await chai.request(app).post('/products').send(body);
    // Assert
    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal({ id: 1, name: 'product', price: '1323' });
  });

  it('Testa se a função retorna o código esperado quando o produto for cadastrado com o tipo de preço errado', async function () {
    // Arrange
    const body = { name: "product", price: 1323, orderId: 1 };
    // Act
    const response = await chai.request(app).post('/products').send(body);
    // Assert
    expect(response.status).to.be.equal(422);
  });

  it('Testa se a função retorna o código esperado quando o produto for cadastrado com nome menor do que o esperado', async function () {
    // Arrange
    const body = { name: "pr", price: "1323", orderId: 1 };
    // Act
    sinon.stub(ProductModel, 'create').resolves(ProductModel.build({ id: 1, ...body }));
    const response = await chai.request(app).post('/products').send(body);
    // Assert
    expect(response.status).to.be.equal(422)
  });

  it('Testa se a função retorna o código esperado quando o produto for cadastrado com o tipo de nome errado', async function () {
    // Arrange
    const body = { name: 1323, price: "1323", orderId: 1 };
    // Act
    const response = await chai.request(app).post('/products').send(body);
    // Assert
    expect(response.status).to.be.equal(422);
  });

  it('Testa se a função retorna o código esperado quando cadastram um produto sem nome', async function () {
    // Arrange
    const body = { name: "", price: "1323", orderId: 1 };
    // Act
    sinon.stub(ProductModel, 'create').resolves(ProductModel.build({ id: 1, ...body }));
    const response = await chai.request(app).post('/products').send(body);
    // Assert
    expect(response.status).to.be.equal(400);
  });

  it('Testa se a função retorna o código esperado quando cadastram um produto sem preço', async function () {
    // Arrange
    const body = { name: "Product", price: "", orderId: 1 };
    // Act
    sinon.stub(ProductModel, 'create').resolves(ProductModel.build({ id: 1, ...body }));
    const response = await chai.request(app).post('/products').send(body);
    // Assert
    expect(response.status).to.be.equal(400);
  });

  it('Testa se a função retorna o código esperado quando cadastram um id de valor inválido', async function () {
    // Arrange
    const body = { name: "Product", price: "123", orderId: 0 };
    // Act
    sinon.stub(ProductModel, 'create').resolves(ProductModel.build({ id: 1, ...body }));
    const response = await chai.request(app).post('/products').send(body);
    // Assert
    expect(response.status).to.be.equal(422);
  });
});
