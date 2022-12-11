# 2048 Demo
A clone of 2048 that I built to practice front-end app dev.

![2048 game](https://github.com/apark9897/2048demo/blob/main/mockups/main.gif?raw=true)
![leaderboard](https://github.com/apark9897/2048demo/blob/main/mockups/leaderboard.png?raw=true)
![user settings](https://github.com/apark9897/2048demo/blob/main/mockups/user_settings.png?raw=true)

## Features
- 2048 game
- Track personal records against overall playerbase
- Leaderboard of top 10 highest scorers

## Tools
- HTML and CSS for structure, styling, and animations
- Vanilla JS for front-end game logic
- NodeJS to serve static files and backend routes
- Redis for leaderboard and tracking player records
- Docker and Docker Compose for quick local testing and deployment
- Bash to add seed data to redis upon startup

## Getting Started
Quick steps to start the project on your local machine for development and testing purposes.

1. Install docker desktop and run the commands below:
```
docker-compose build
docker-compose up
```
