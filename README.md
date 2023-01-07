# BugBust

![Alt text](https://github.com/bycarlosgamez/assets/blob/main/bugbust/bugbust.gif)

BugBust is a software application that is used to manage and track bugs or defects in software development projects. It is an essential tool for developers to identify, prioritize, and fix issues in their code.

This is an ongoing project, this first part is an MVP with all basic functionality and authentication, where users can create an account, login, create a ticket, edith a ticket, delete a ticket, make comments to tickets, this MVP uses MVC architectural pattern.

## How It's Made:

**Tech used:**

- Fronyend: HTML, CSS(tailwindcss), JavaScript
- Backend: Node, Express, MongoDB, Cloudinary, Passport

## Getting Started

**Instructions**

- Fork and clone the repository to your local computer.
- Add and store .env file in the config folder
- .env must have:
  PORT = portOfChoice,
  DB_STRING = yourMongoString,
  CLOUDINARY_CLOUD_NAME=YourName,
  CLOUDINARY_KEY=YourKey,
  CLOUDINARY_SECRET=YourSecret,
  CLOUDINARY_URL=YourUrl
- npm install in the root folder. installs the required dependencies.
- npm start in the root folder. This starts the front-end and back-end in one terminal.

## Optimizations

This is an ongoing project and some optimizations include:

- Add a projects page to divide ticket based on different projects.
- Created a dashboard page per user.
- Refactor frontend to use React.
- Install tailwind using cli or postcss insted of cdn (wih was used as playground for development purposes only)
