# Shopify Challenge

The following documentation describes the usage for a REST API built using nestJs.

# Getting started

## Installing dependencies

> it's is recommended to use yarn to manage all dependencies. Simply run:

```
$ yarn
```

### Running tests

Unit testing is implement to ensure everything works as it should. To run all test cases with test covarge, run

```
$ yarn test:cov
```
and without coverage

```
$ yarn test
```
mock functions were written to mimick database features so there is no need to run a seperate database instance to run tests.

# API Documentation

### Entities

- InventoryItems: Represent resource that stores an item in the inventory
- DeletedItems: Represent resource that has been deleted

### InventoryItems definition

- id: 
  - type: int
  - description: represent the primary key of the item in the database (increments automatically) 
- productCategory: 
  - type: string
  - description: the category of the item
- title: 
  - type: string
  - description: the name of the product 
- brand: 
  - type: string
  - description: the company/brand producing the product 
- price: 
  - type: float
  - description: the price of the item in a certain currency (this would be a seperate field)
- currency: 
  - type: string;
  - description: the currency at which the price represent 
- quantity: number;
- createdAt: Date;
- updatedAt: Date;

![create-inventory-item](https://user-images.githubusercontent.com/73405989/169741881-4921867b-eb7d-4722-8701-47b58788c47f.PNG)
![getAllInventoryItems](https://user-images.githubusercontent.com/73405989/169741972-f50a45d1-30ae-4fd5-a242-d8d503cd4297.PNG)
![getItemEndpoint](https://user-images.githubusercontent.com/73405989/169741988-93e1a4af-415f-475e-bf63-04f1f58ca01b.PNG)
![editItemEndpoint](https://user-images.githubusercontent.com/73405989/169741907-23fc3f88-e9fa-4807-9067-45bd6f256516.PNG)
![deleteItems](https://user-images.githubusercontent.com/73405989/169742826-2d912ffe-d067-4680-ba94-1bc2a842419e.PNG)
![viewAllDeletedItems](https://user-images.githubusercontent.com/73405989/169742834-0d412d43-0909-47e0-ad55-cce2747990ff.PNG)
![restoreDeletedItem](https://user-images.githubusercontent.com/73405989/169742857-a8d76c6f-10ed-4326-9f63-6fa42abb3c04.PNG)
