# 🐶 Canine World

**Canine World** is a web application that allows users to explore dog breeds, view detailed information about each one, and access real-time data on dogs available for adoption, already adopted, or found.

The application integrates two external APIs to provide up-to-date and reliable content:

- [The Dog API](https://thedogapi.com) – Breed data and characteristics
- [Petfinder API](https://www.petfinder.com/developers/) – Information about dogs for adoption

---

## 🚀 See the Project in Action

You can **watch a demo of the application** running here:

[![▶️ Launch App](https://img.shields.io/badge/Click_Here-blue?style=for-the-badge)](https://canine-world-1.onrender.com/)

---

## 📂 App Structure

### 🏠 Home
- General presentation of the project
- Quick access to main sections

### 🐾 Lost Dogs
- List of dogs reported as missing

### 🔍 Breed Explorer
- Breed search
- Filters by traits
- Detailed view: origin, purpose, lifespan, weight, height, temperament

### 🏡 Adoption & More
**Filtered by status:**
- Available for adoption: currently available dogs
- Adopted: recently adopted dogs
- Found: in custody, waiting to be claimed

Each profile includes:
- Image
- Name
- Age and size
- Location
- Contact information

### ℹ️ About the Project
- **Goal:** promote responsible adoption and provide useful information about the canine world
- **Focus:** user-friendly interface and valuable content

---

## 💡 Features & Highlights

- Real-time data from the Petfinder API, including pet adoption statuses:

      Adoptable (found and available for adoption)

      In adoption process

      Adopted
- Breed explorer with filters and detailed information.
- Responsive design using Bootstrap 5.
- API key protection via environment variables, both on the frontend and backend.
- Dynamic real-time data loading through external APIs.
- Integration of a RESTful backend for API communication.
---

## 🛠️ Technologies Used

- **React**: UI built with functional components and hooks
- **React Router DOM v6**: Routing and navigation for web applications
- **Bootstrap 5**: Responsive design and UI components
- **Fetch API**: Dynamic data fetching from external APIs
- **Environment variables (.env)**: Secure management of API keys and URLs
- **Custom CSS**: Tailored styles for the application
- **JavaScript**: (ES6+) Application logic and functionality
- **Express.js**: Backend server and API management
- **Node.js**: Development environment and dependency management with npm
- **TheDog API**: External API for dog breed information and data
- **Petfinder API**: Management of adoption data and available animals

---

## ⚙️ Installation & Running the App

1. Clone the repository:

```bash
git clone https://github.com/Leslie589/Canine-World.git
cd canine-world
```
2. Install dependencies:

```bash
npm install

# Run the application
npm start

```

3. Set up environment variables:

- Frontend (.env file at the root of the frontend project)::

```bash
REACT_APP_DOG_API_KEY=your_thedogapi_key
REACT_APP_BACKEND_URL=http://localhost:5000  # or your deployed backend URL
```
- Backend (.env file in the backend folder):
```bash
  PETFINDER_API_KEY=your_petfinder_key
PETFINDER_API_SECRET=your_petfinder_secret
🔐 These credentials are required to obtain an access token and authenticate API requests.
```

🔑 API Key Registration

To use the APIs, you need to register and obtain keys from:

- [The Dog API](https://thedogapi.com) 

- [Petfinder API](https://www.petfinder.com/developers/)
