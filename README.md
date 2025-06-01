# 🧠 Angular Task Manager

This project is a solution to the Fullstack Technical Challenge, built with **Angular 17**, using standalone components, Angular Material for UI, and deployed on **Firebase Hosting and Functions**.

---

## 🚀 Tech Stack

- 🔧 [Angular 17](https://angular.io/)
- 🎨 [Angular Material](https://material.angular.io/)
- ☁️ [Firebase Hosting](https://firebase.google.com/docs/hosting)
- 🔥 [Firebase Functions](https://firebase.google.com/docs/functions)
- 🧪 Karma & Jasmine (Unit Testing)

---

## 🗂️ Project Structure
src/
├── app/
│ ├── core/
│ │ └── features/
│ │ ├── auth/ # Email-based login
│ │ └── tasks/ # Task CRUD operations
│ └── environments/ # dev & prod environment configs
├── assets/
└── index.html


---

## 📋 Features

✅ Email-based login (creates user if not found)  
✅ Create, update, delete tasks  
✅ Mark tasks as completed  
✅ Backend powered by Firebase Functions  
✅ Route protection using `authGuard`  
✅ Responsive design with Angular Material

---

## 🔧 Development Scripts

```bash
# Install dependencies
npm install

# Start local dev server
ng serve

# Build production version
ng build --configuration production

# Run unit tests
ng test

// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};


# Build for production
ng build --configuration production

# Initialize hosting (first time only)
firebase init hosting

# Deploy
firebase deploy

Ensure firebase.json contains:

"public": "dist/<your-app-name>"

🧪 Unit Test Coverage

Components covered by tests:

    ✅ task-form.component

    ✅ task-list.component

    ✅ login-form.component

    ✅ login-page.component

    ✅ auth.guard

    ✅ task.service and auth.service
