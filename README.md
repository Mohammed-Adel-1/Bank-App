# 🏦 Simple Banking System API

A secure and minimal banking backend system built using **Node.js, Express, TypeScript, and MongoDB**.
This system allows users to manage their bank accounts, perform transactions, and view financial summaries safely.

---

## 🚀 Features

### 👤 User

* Register & Login using JWT authentication
* Passwords are securely hashed
* Each user has **exactly one bank account**

---

### 💳 Bank Account

* Each user owns **one account only**
* Account contains:

  * accountNumber
  * balance
  * currency
  * status (`active`, `inactive`)

---

### 💸 Transactions

Users can perform:

* Deposit
* Withdraw
* Transfer to another user

Each transaction includes:

* amount
* type (`deposit`, `withdraw`, `transfer`)
* balanceBefore
* balanceAfter
* status (`pending`, `completed`, `failed`)
* createdAt

---

### 👥 Beneficiary

* Store recipient data for transfers
* Includes:

  * accountNumber
  * bankName
  * nickname

---

## 🔐 Security & Validation

* ✅ Authentication Using JWT
* ✅ Password hashing
* ✅ Validation Using Zod:

  * Body
  * Params
  * Query
* ✅ Rate limiting (express-rate-limit)
* ✅ Secure headers (helmet)
* ✅ Can Not Access Other User's Account

---

## ⚠️ Business Rules

* Every User Has Exactly One Account
* Transactions Can Not Be Done on Inactive Account
* Withdrawals And Transfers Can Not Be Done If The Account Balance Is Insufficient
* Every Transaction Is Fully Recorded In The Database (Balance Before And After Transaction)
* All The Transactions Require Login

---

## 📌 API Functionalities

### 1. Account

* Get current user account details

### 2. Transactions

* Get all transactions
* Get transaction by ID
* Deposit
* Withdraw
* Transfer


---

## 🗄️ Database Structure

### User

```ts
{
  id,
  fullName,
  email,
  password (hashed),
  role
}
```

### BankAccount

```ts
{
  id,
  userId,
  accountNumber,
  balance,
  currency,
  status
}
```

### Transaction

```ts
{
  id,
  accountId,
  type,
  amount,
  balanceBefore,
  balanceAfter,
  status,
  createdAt
}
```

### Beneficiary

```ts
{
  id,
  ownerUserId,
  accountNumber,
  bankName,
  nickname
}
```

---

## 🧪 Example Workflow

1. User signs up
2. User logs in → receives JWT
3. User accesses protected routes using token
4. User performs:

   * Deposit / Withdraw / Transfer
5. Transactions are stored with full details

---

## ❗ Error Handling

Handled cases include:

* Unauthorized access
* Invalid token
* Invalid MongoDB ID
* Insufficient balance
* Account not found
* Transaction not found
* Blocked or frozen account

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* TypeScript
* MongoDB + Mongoose
* Zod (Validation)
* JWT (Authentication)
* Helmet (Security)
* Express Rate Limit
* Dotenv

---

## 📌 Notes

* The System Is Designed To Be Simple And Scalable
* Can Be Added:

  * Notifications
  * Admin dashboard
  * Multi-currency support
  * Transaction fees

---

## 👨‍💻 Author

Mohammed Adel

---
