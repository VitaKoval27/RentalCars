# 🚗 Rental Car — Vehicle Rental Service

A modern web application for searching and booking rental cars. Users can browse a comprehensive catalog, filter vehicles by brand, price, and mileage, and manage their personal list of favorite cars.

---

## 🌟 Key Features

- **Car Catalog**: Browse a wide range of vehicles with detailed specifications.
- **Backend Pagination**: Efficient data loading (12 cards per page) using server-side pagination to ensure high performance.
- **Advanced Filtering**: Search by car brand, hourly rental price, and specific mileage range.
- **Favorites System**: Add cars to a personal favorites list with persistent storage (LocalStorage).
- **Detailed Specifications**: Modal windows providing full car details and rental conditions.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.

---

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **State Management**: [Zustand](https://docs.pmnd.rs/zustand/)
- **Data Fetching**: [Axios](https://axios-http.com/) & [TanStack Query](https://tanstack.com/query/latest)
- **Styling**: CSS Modules
- **Icons**: React Icons
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/VitaKoval27/RentalCars.git](https://github.com/VitaKoval27/RentalCars.git)
   
2 Navigate to the project directory:
cd RentalCars   
3 Install dependencies: npm i 
4 Environment Variables: Create a .env.local file in the root directory and add: NEXT_PUBLIC_API_URL=[https://car-rental-api.goit.global](https://car-rental-api.goit.global)
5 Start the development server: npm run dev

📖 Usage
Catalog Page: Use the filters at the top to find the perfect car.
Pagination: Click the "Load more" button to fetch the next set of vehicles from the server.
Details: Click "Learn more" on any car card to see full technical specs and rental conditions.
Favorites: Click the heart icon to save a car. Access your saved list anytime via the Favorites page.

👤 Author
Vita Koval
GitHub: @VitaKoval27
This project was developed as part of the GoIT educational course.

🔗 Project Links
Live Demo: https://rental-cars-taupe.vercel.app/
API Documentation: GoIT Car Rental API
