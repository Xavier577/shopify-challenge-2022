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
- quantity: 
  - type: int
  - description: represents the quantity of the item in stock 
- createdAt: 
  - type: Date
  - description: reprents the date at which the item was created 
- updatedAt:
  - type: Date
  - Description: represent the date at which the item was last updated 

### DeletedItem definition

- id: 
  - type: int
  - description: represent the primary key of the item in the database (increments automatically) 
- itemId:
  - type: int
  - description: represent the id of the item in the inventory item table (this is what would be used to find the item to restore it) 
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
- quantity: 
  - type: int
  - description: represents the quantity of the item in stock 
- createdAt: 
  - type: Date
  - description: reprents the date at which the item was created 
- updatedAt:
  - type: Date
  - Description: represent the date at which the item was last updated 

##  Endpoints

### Create InventoryItem

This is a `POST` endpoint for creating items in the inventory.

- method `POST`
- PATH  `<host-name>/api/inventory-items/create`

![create-inventory-item](https://user-images.githubusercontent.com/73405989/169741881-4921867b-eb7d-4722-8701-47b58788c47f.PNG)

### Fetch all InventoryItem

This is a  `GET` endpoint for fetching all the items in the inventory.

- method `GET`
- PATH `<host-name>/api/inventory-items/` 

![getAllInventoryItems](https://user-images.githubusercontent.com/73405989/169741972-f50a45d1-30ae-4fd5-a242-d8d503cd4297.PNG)

### Fetch a Single InventoryItem

This is a dynamic ` GET` endpont for fetching an item from the inventory with its id.

- method `GET`
- params `:id`
- PATH `<host-name>/api/inventory-items/[id]`

![getItemEndpoint](https://user-images.githubusercontent.com/73405989/169741988-93e1a4af-415f-475e-bf63-04f1f58ca01b.PNG)

### Edit an InventoryItem

This is a dynamic `PATCH` endpoint for updating items from the inventory.

- method `PATCH`
- params `:id`
- PATH  `<host-name>/api/inventory-items/edit/[id]`
- 
![editItemEndpoint](https://user-images.githubusercontent.com/73405989/169741907-23fc3f88-e9fa-4807-9067-45bd6f256516.PNG)

### Delete InventoryItem

This is a dynamic  `DELETE` endpoint for deleting items from the inventory.

- method `DELETE`
- params `:id`
- DELETE `<host-name>/api/inventory-items/delete/[id]`

![deleteItems](https://user-images.githubusercontent.com/73405989/169742826-2d912ffe-d067-4680-ba94-1bc2a842419e.PNG)

### View Deleted Items

This is a `GET` endpoint for fetching all deleted items

- method `GET`
- PATH `<host-name>/api/inventory-items/deleted-items/`
- 
![viewAllDeletedItems](https://user-images.githubusercontent.com/73405989/169742834-0d412d43-0909-47e0-ad55-cce2747990ff.PNG)
![restoreDeletedItem](https://user-images.githubusercontent.com/73405989/169742857-a8d76c6f-10ed-4326-9f63-6fa42abb3c04.PNG)
