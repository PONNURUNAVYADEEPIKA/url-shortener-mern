# url-shortener-mern
A simple MERN stack app that shortens long URLs into short, shareable links. Visiting a short link redirects to the original URL, and an admin API shows all links with visit counts. Built using React, Node.js, Express, and MongoDB.

# URL Shortener (MERN Stack)

This is a simple web app that makes long URLs short and easy to share.  
When you click the short link, it opens the original long link.  
It also has an admin API to see all links and how many times they were used.

---

## Features
- Shorten long links.
- Redirect to the original link when opened.
- Admin API to list all links and visit counts.

---

## Built With
- React (Frontend)
- Node.js + Express (Backend)
- MongoDB (Database)

---

## How to Run

### 1. Clone the project
git clone https://github.com/PONNURUNAVYADEEPIKA/url-shortener-mern.git
cd url-shortener
2. Backend setup
cd backend
npm install

Create a file named .env in backend folder and add:
MONGO_URI=your_mongodb_connection
BASE_URL=http://localhost:5000
PORT=5000
Run backend:
npm start

3. Frontend setup
cd ../frontend
npm install

Create a file named .env in frontend folder and add:
REACT_APP_API_URL=http://localhost:5000
Run frontend:
npm start
How to Use
Open http://localhost:3000

Paste a long URL and click Shorten.

Copy the short URL and open it in a new tab.

It will take you to the original link.

To see all links and visit counts, open:
http://localhost:5000/api/admin/list
Demo
GitHub Repo:  https://github.com/PONNURUNAVYADEEPIKA/url-shortener-mern.git
