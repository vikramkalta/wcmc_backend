# WCMC APIs

Run npm install and npm run start to start the project
You might have to start mongo server and supply a path in .env.development file
Find an example for doing so below:
MONGO_URL=mongodb://localhost:27017/
MONGO_DB_NAME=wcmc
SECRET=SECRET12345

API LIST:

Post country data:
http://localhost:3001/api/country-data/bulk-all

Get country names:
http://localhost:3001/api/country-data/countries?prefix=Est

Get metrics:
http://localhost:3001/api/country-data/metrics?country=Estonia'