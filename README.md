# 🚀 PharosQuiz Nexus

*PharoQuiz Nexus is a real-time, Web3-powered quiz competition platform where users host, join, and win crypto-backed quizzes. Built for the future of interactive learning and decentralized gaming.*

---

## 🌟 Overview

**PharosQuiz Nexus** combines the real-time excitement of quiz platforms like Slido and Kahoot with the decentralized power of blockchain. Players can host quizzes, fund prize pools, compete in real time, and win crypto rewards—backed by smart contracts on the **Pharos Tag Blockchain**.

The platform is fully decentralized and integrates wallet-based authentication, smart contract-powered payouts, and live multiplayer quiz experiences. Whether you're a quiz creator or a participant, PharosQuiz is built to make knowledge rewarding—literally.

---

## 🧠 Key Features

### ✅ User Authentication & Wallet Integration

* Secure sign-up/login using email and password.
* MetaMask and Web3 wallet integration (via Web3Modal + Ethers.js).
* Each user’s wallet is linked to their identity for reward distribution.

### 🎮 Quiz Hosting

* Any registered user can host a quiz.
* Hosts create up to **30 timed multiple-choice questions**.
* Each question has a 15–20 second timer and one correct answer.
* A **6-digit unique quiz code** is generated for participants to join.

### 🧑‍🤝‍🧑 Joining Quizzes

* Players join live quizzes using the 6-digit code.
* Real-time participation powered by **WebSockets (Socket.io)**.
* A shared, synchronized quiz flow for all participants.

### 🥇 Leaderboard & Rewards

* Live leaderboard updates after each question.
* Top 3 players are automatically awarded crypto prizes upon completion.
* Rewards are distributed by **smart contracts**, with funds pooled by the host.

### 💰 Crypto Prize Pool

* Quiz hosts must fund a prize pool when creating a quiz.
* Smart contracts lock the funds securely and release them based on leaderboard positions:

  * 🥇 1st Place: 50%
  * 🥈 2nd Place: 30%
  * 🥉 3rd Place: 20%

---

## 🖌️ Design Language & Color Palette

PharosQuiz follows a bold, futuristic Web3 design theme.

| Color Name       | HEX       | Usage                        |
| ---------------- | --------- | ---------------------------- |
| `pharosNavy`     | `#0B0F2A` | Background / base tone       |
| `neonCyan`       | `#00FFF0` | Primary buttons / highlights |
| `electricPurple` | `#8A00FF` | Secondary accents            |
| `magentaGlow`    | `#FF4ECD` | Alerts, error states         |
| `tealMist`       | `#1CE1C1` | Success states               |
| `slateWhite`     | `#F7F9FC` | Text & cards                 |
| `ironGray`       | `#2E3A59` | Headings / UI contrast       |

---

## ⚙️ Tech Stack

### 🔗 Web3 / Smart Contracts

* **Blockchain**: [Pharos Tag Blockchain](https://pharoschain.com)
* **Smart Contracts**: Solidity or Pharos-compatible L1 (e.g., Cairo or Clarity)
* **Wallet Integration**: MetaMask, Ethers.js

### 🖥️ Frontend

* **Framework**: React + Tailwind CSS
* **Routing**: React Router v6
* **Real-time**: Socket.io-client
* **State**: React Context or Redux Toolkit

### 🔧 Backend

* **API Server**: Node.js (Express.js)
* **Database**: PostgreSQL / Supabase / MongoDB (choose based on use case)
* **Auth**: JWT + email-based registration
* **WebSockets**: Socket.io

---

## 📂 Project Structure

```
pharosquiz/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── contexts/
│   ├── services/       ← API and WebSocket clients
│   └── styles/         ← Tailwind and global styles
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── sockets/
│   └── services/
│
└── smart-contracts/
    ├── QuizContract.sol
    ├── PrizeDistributor.sol
    └── ...
```

---

## 🔧 Environment Variables

Create a `.env.local` file in the `frontend/` directory with:

```env
REACT_APP_API_BASE_URL=https://pharosquiz-backend.devnet.pharoschain.com/api
REACT_APP_WS_URL=wss://pharosquiz-backend.devnet.pharoschain.com/ws
```

And in the backend:

```env
PORT=5000
JWT_SECRET=your_secure_secret
DB_URI=your_database_uri
PHAROS_RPC_URL=https://rpc.pharoschain.com
SMART_CONTRACT_ADDRESS=0x...
```

---

## 🚀 Getting Started

### 🖥️ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 🛠️ Backend Setup

```bash
cd backend
npm install
npm run dev
```

### 🧾 Smart Contract Deployment

Use a Pharos Tag Blockchain-compatible toolchain (like Pharos Studio or Remix with injected provider) to compile and deploy smart contracts. Ensure `SMART_CONTRACT_ADDRESS` is updated in `.env` and frontend contract interactions.

---

## ✨ Coming Soon

* Live chat rooms per quiz
* NFT badges for top players
* DAO-powered quiz moderation
* Quiz marketplaces and public archives
* Reputation scoring for hosts

---

## 🤝 Contributing

We welcome contributions from developers, designers, and community builders. Please fork the repo, open PRs, or file issues.

---

## 📫 Contact

* Twitter: [@PharosQuiz](https://twitter.com/PharosQuiz)
* Email: `hello@pharosquiz.com`
* Discord: Coming soon

---

### © 2025 PharosQuiz Nexus. All rights reserved.
