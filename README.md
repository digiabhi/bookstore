# Microservices Architecture for Book Purchase System

This repository contains an application consisting of 4 microservices designed to handle various functionalities related to book purchase. Here's an overview of each microservice:

1. **API Gateway Service**:
   - Responsible for handling all authentications and authorization-based works.
   - Acts as the entry point for incoming requests, routing them to respective services.

2. **Book Search Service**:
   - Handles requests related to searching for books and authors.
   - Provides functionalities for efficient book search operations.

3. **Purchase Service**:
   - Manages all purchase-related tasks, including payment concurrency.
   - Utilizes the concept of idempotency keys for handling purchase requests.
   - Implements row-level lock (pessimistic concurrency control) on `sellCount` during purchases to manage limited stock scenarios.
   - Ensures idempotency to prevent duplicate purchase actions and maintain transaction integrity.

4. **Notification Service**:
   - Takes care of all notification-related tasks, such as sending emails.
   - Communicates with a separate microservice and database for tracking sent and pending emails.
   - Utilizes RabbitMQ for handling asynchronous tasks related to notifications.

## Concurrency Control

### Pessimistic Concurrency Control
- Implemented on `sellCount` during purchases to ensure only the first requester gets the books if stock is limited.
- Uses row-level locks to prevent race conditions and ensure transaction consistency.

### Optimistic Concurrency Control
- Conditions like increasing `sellCount` based on the last count handle concurrency.
- Increases `sellCount` only after successful payment; failed payments result in transaction rollback.

## Idempotency for Purchase Requests

- Idempotency keys are used in purchase requests to ensure that duplicate requests do not result in unintended duplicate purchases.
- Each purchase request is associated with a unique idempotency key, allowing the system to identify and handle duplicate requests gracefully.
- Idempotency ensures that even if a request is sent multiple times due to network issues or user actions, the system processes it exactly once, maintaining data consistency and preventing unintended charges.

## Database and Messaging Queue

- **Database**: MySQL is used for its transaction support and data consistency requirements.
- **Messaging Queue**: RabbitMQ handles asynchronous tasks, ensuring efficient processing of notifications.

## Why MySQL and RDBMS?

MySQL is chosen due to its suitability for transaction-heavy operations and the need for data consistency. RDBMS is preferred over NoSQL for this application's requirements, including concurrency control and transaction management.

---