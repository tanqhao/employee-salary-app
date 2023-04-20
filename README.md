# EmployeeSalaryApp

This project uses a mongoDB connection to store the data.

You can create your own .env file and set the path for mongoDB
DB_CONNECT=
You can also overwrite the port with
PORT=


npm run node - to run backend
ng serve - to run frontend

API Endpoints 

Upload a CSV file
POST Request
http://localhost:3000/api/user/upload


Get employees details
GET request
http://localhost:3000/api/user/users

Query Params
minSalary
maxSalary
offset
limit
sort
