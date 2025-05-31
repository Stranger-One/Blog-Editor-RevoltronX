# Blog Editor - RevoltronX

A modern, user-friendly blog editor designed for seamless content creation and management.

## Tech Stack

- **Frontend:** React.js, Redux, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **Other:** RESTful APIs, Axios

## Setup Instructions

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Stranger-One/Blog-Editor-RevoltronX.git
    cd Blog-Editor-RevoltronX
    ```

2. **Install dependencies:**
    - For the frontend:
      ```bash
      cd client
      npm install
      ```
    - For the backend:
      ```bash
      cd ../server
      npm install
      ```

3. **Configure environment variables:**
    - Add your MongoDB URI, PORT, JWT_SECRET to the `.env` file in the `server` directory.


4. **Run the application:**
    - Start the backend server:
      ```bash
      cd server
      npm run dev
      ```
    - Start the frontend development server:
      ```bash
      cd ../client
      npm run dev
      ```

5. **Access the app:**
    - Open your browser and go to `http://localhost:5173`

## License

MIT
