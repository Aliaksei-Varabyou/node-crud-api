# Node.js Simple CRUD Application

This is an example of a Node.js application that implements CRUD operations and supports multiprocessing using the Node.js Cluster API.

## Functionality

- **CRUD operation**: Create, read, update and delete data.
- **Two modes of operation**:
  - Single-process mode.
  - Multi-process mode with load balancer.

## Requirements

To run the application you need:

- Node.js (version 24.10.0 or upper)
- npm (usually comes with Node.js)

## Installation

Follow these steps to install the application:

1. Clone the repository:
   ```bash
   git clone https://github.com/Aliaksei-Varabyou/node-crud-api.git
   cd node-simple-crud-api
   ```
2. Change branch:
   ```bash
   git checkout develop
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create .env file:
   ```bash
   cp .env.example .env
   ```

# Launching the application

You can run the application in the next modes:

## Single process mode

```bash
npm run start:dev
```

## Multiprocess mode

```bash
npm run start:multi
```

## It is also possible to build applications in prod mode

```bash
npm run start:prod
```

# Usage

Once the application is running, you can interact with it by sending HTTP requests to the appropriate endpoints:

GET /api/products: getting a list of data.
POST /api/products: creating a new entry.
GET /api/products/:id: getting a record by ID.
PUT /api/products/:id: update record by ID.
DELETE /api/products/:id: delete record by ID.

# Multiprocess mode

In multiprocess mode, requests are distributed across different processes. Each process listens to its own unique port, starting from 4001 and onwards. The load balancer listens on port 4000 and distributes incoming requests between the processes.

# Testing

```bash
npm run test
```
