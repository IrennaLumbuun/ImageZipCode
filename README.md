# ImageZipCode

# Try it yourself!
Go to https://evt-frontend.herokuapp.com/ 
(please allow up to 15 seconds when the page first load. Heroku free tier makes the app *goes to sleep* after 30 minutes of no traffic.
That being said, the first get zipcode request might take up to 15 seconds as well; to *wake up* the back-end server.)

# Run this on local
1. Clone this repository
2. Run `pip3 install -r requirements.txt`
3. Run `flask run`
4. cd front-end
5. Run `yarn install`
6. Run `yarn start`

# Docker Build
1. To run the backend, run `docker pull irennalumbuun/evtproject:latest && docker run -p 8081:5000 irennalumbuun/evtproject`
(To make sure backend is running, go to http://localhost:8081/release-info. It should return the version number)
2. To run the front-end, run `docker pull irennalumbuun/evtproject-frontend && docker run -p 8080:3000 irennalumbuun/evtproject-frontend`
