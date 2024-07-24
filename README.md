# MY_API_APP

##URL TO APP (vercel): my-api-app-ycfs.vercel.app

###Mentor-Student Coding Collaboration
Task is a web application designed for real-time code sharing and collaboration between mentors and students. The application allows a mentor to observe and guide a student's coding process in real-time using websockets and syntax highlighting.

####Features
Real-time code editing and sharing
Syntax highlighting
Mentor-student roles with different access permissions
Backend powered by Express and MongoDB
Frontend built with React

# Setup Backend in terminal:
cd backend
npm install
node server.js

# Setup Frontend in new terminal:
cd frontend
npm install
npm start

# Usage:
Navigate to the lobby page to select a code block.
Students can edit the code, and mentors can view the code in real-time.
Use the "Check Solution" button to validate the student's code against the stored solution.

# Technologies:
Frontend: React, socket.io-client, highlight.js
Backend: Express, MongoDB, Mongoose, socket.io
Other Libraries: cors, axios
