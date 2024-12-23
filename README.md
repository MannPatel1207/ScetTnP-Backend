# TnP Backend for SCET

This repository contains the backend for the Training and Placement (TnP) system for SCET. The backend is designed to manage data related to students, recruiters, and placement activities, providing a robust and scalable solution.

## Features

- **Student Management:** Handle student data, resumes, and placement records.
- **Recruiter Management:** Manage recruiter details and job postings.
- **Admin Dashboard:** Administrative tools for managing placement activities.
- **Authentication:** Secure login for students, recruiters, and administrators.
- **RESTful API:** Provides endpoints for seamless integration with the frontend.

## Tech Stack

- **Backend Framework:** Node.js (Express.js)
- **Database:** MongoDB
- **Other Tools:**
  - dotenv for environment variables
  - nodemailer for email communication
  - multer for file uploads

## Installation

Follow these steps to set up the backend locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tnp-backend.git
   cd tnp-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=5000
     DATABASE_URL=your_database_url
     JWT_SECRET=your_secret_key
     EMAIL_SERVICE=your_email_service
     EMAIL_USER=your_email
     EMAIL_PASS=your_email_password
     ```

4. Start the server:
   ```bash
   npm start
   ```

   The server will run on `http://localhost:5000` by default.

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Create a pull request.



## Contact

For any queries or suggestions, please contact:
- **Name:** Mann Patel
- **Email:** mann.patel.1207@gmail.com
- **GitHub:** https://github.com/MannPatel1207
