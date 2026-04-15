ChargeX
## 📁 Repository Structure

├─ backend/ # Node.js + Express.js backend
├─ frontend/ # EJS templates, HTML, CSS, JS
├─ public/ # Static files
├─ .env.example # Environment variables template
├─ package.json
└─ README.md

yaml
Copy code

---

## 🔧 Installation Setup

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/plugNgox.git
cd plugNgox
2. Install dependencies
bash
Copy code
npm install
install nodemon globally


4. Start the server
bash
Copy code
npm run dev
nodemon app.js
npm start
The backend will run at http://localhost:3000/home (default).

🌿 Working in Branches
We have a public repository, but each member should work in their own branch.

Example: Create and switch to your branch
bash
Copy code
git checkout -b vivek
1. Make changes
Implement features in your branch (e.g., vivek branch)

Test locally

2. Stage and commit your changes
bash
Copy code
git add .
git commit -m "Added feature X / Fixed bug Y"
3. Push your branch to GitHub
bash
Copy code
git push origin vivek
🔄 Creating a Pull Request (PR)
Once your feature is ready:

Go to the GitHub repository → Pull requests → New pull request.

Select base branch as main and compare branch as your feature branch (e.g., vivek).

Add a clear title and description of your changes.

Click Create pull request.

Wait for review and merge by the admin.

⚠️ Important: Never push directly to the main branch. Always create a branch and PR.

