<!--
Hey, thanks for using the megak-head-hunter-15-server template.
If you have any enhancements, then fork this project and create a pull request
or just open an issue with the label "enhancement".

Don't forget to give this project a star for additional support ;)
Maybe you can mention me or this repo in the acknowledgements too
-->
<div align="center">

  <!-- <img src="assets/logo.png" alt="logo" width="200" height="auto" /> -->
  <h1>Megak Head Hunter 15 Server</h1>
  
  <p>
    Megak Head Hunter 15 is a group project developed by the participants of the 15th group from the first edition of the MegaK online course.
  </p>
<h4>
    <a href="https://github.com/GramosTV/megak-head-hunter-15-server/issues/">Report Bug</a>
  <span> · </span>
    <a href="https://github.com/GramosTV/megak-head-hunter-15-server/issues/">Request Feature</a>
  </h4>
</div>

<br />

<!-- Table of Contents -->

# :notebook_with_decorative_cover: Table of Contents

- [About the Project](#star2-about-the-project)
  - [Screenshots](#camera-screenshots)
  - [Tech Stack](#space_invader-tech-stack)
  - [API endpoints documentation](#dart-features)
  - [Color Reference](#art-color-reference)
  - [Environment Variables](#key-environment-variables)
- [Getting Started](#toolbox-getting-started)
  - [Prerequisites](#bangbang-prerequisites)
  - [Installation](#gear-installation)
  - [Run Locally](#running-run-locally)
  - [Deployment](#triangular_flag_on_post-deployment)
- [Usage](#eyes-usage)
- [Roadmap](#compass-roadmap)
- [License](#warning-license)
- [Contact](#handshake-contact)
- [Acknowledgements](#gem-acknowledgements)

<!-- About the Project -->

## :star2: About the Project

<!-- Screenshots -->

### :camera: Screenshots

<div align="center"> 
  <img src="https://i.imgur.com/c16s0XG.png" alt="screenshot" />
  <img src="https://i.imgur.com/CXPqXbr.png" alt="screenshot" />
  <img src="https://i.imgur.com/JFsOB6V.png" alt="screenshot" />
  <img src="https://i.imgur.com/MiRQrHb.png" alt="screenshot" />
  <img src="https://i.imgur.com/1qCpiKW.png" alt="screenshot" />
  <img src="https://i.imgur.com/GNnmKWY.png" alt="screenshot" />
</div>

<!-- TechStack -->

### :space_invader: Tech Stack (for both Client and Server)

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
    <li><a href="https://reactjs.org/">React.js</a></li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
    <li><a href="https://nestjs.com/">Nest.js</a></li>
  </ul>
</details>

<details>
<summary>Database</summary>
  <ul>
    <li><a href="https://www.mysql.com/">MySQL</a></li>
    <li><a href="https://www.typeorm.io/">TypeORM</a></li>
  </ul>
</details>

<!-- API endpoints documentation -->

## :dart: API endpoints documentation

### Authentication
#### `POST /auth/login`

<p> 
  Sign in route that verify user data and bcrypt hashed password and returns httpOnly Cookie with user jwt token payload 
</p>
<p>
Accepting JSON:

```javascript
{
	"email": "email",
	"password": "password"
}
```
</p>

#### `GET /auth/logout`

<p> 
  Log out route that needs authorization by verifing if the user has been signed in before
</p>

#### `PATCH /auth/activate/:userId/:actovationToken`

<p> 
  Activation route used to set the user password for the first time and to activate the account
</p>
<p>
Accepting JSON:

```javascript
{
	"newPassword": "newPassword"
}
```
</p>

#### `GET /auth/me`

<p> 
  Checking the authentication status route. Returns user payload extracted from cookie, otherwise returns error message which is handled by frontend
</p>

### Admin features

#### `POST /admin/addStudents`

<p> 
  Route that verify provided users' data and adding users list to the database. Requires signed in user with admin role.
</p>
<p>
Accepting JSON:

```javascript
{"students": [
		{
		"email": "email",
 		"courseCompletion": "courseCompletion",
  	"courseEngagement": "courseEngagement",
  	"projectDegree": "projectDegree",
  	"teamProjectDegree": "teamProjectDegree",
  	"bonusProjectUrls": "bonusProjectUrls"
		}
]
}
```
</p>

#### `POST /hr`

<p> 
  Route that verify provided hr's data and adding hr to the database. Requires signed in user with admin role.
</p>
<p>
Accepting JSON:

```javascript
{ 
	"email": "email", 
	"fullName": "fullName", 
	"company": "company", 
	"maxReservedStudents": "maxReservedStudents"
}
```
</p>

### HR features

#### `PATCH /hr/add-student`

<p> 
  Route that adds selected student to the HR's list Requires signed in user with HR role.
</p>
<p>
Accepting JSON:

```javascript
{ 
	"email": "email"
}
```
</p>

#### `PATCH /hr/remove-student`

<p> 
  Route that remove selected student from the HR's list. Requires signed in user with HR role.
</p>
<p>
Accepting JSON:

```javascript
{ 
	"email": "email"
}
```
</p>

#### `PATCH /hr/hire-student`

<p> 
  Route to inform about hiring selected student. Changing status of selected student to hired. Hired students are not visible to other HRs. Supports email notifications. Requires signed in user with HR role.
</p>
<p>
Accepting JSON:

```javascript
{ 
	"email": "email"
}
```
</p>

### Utilities

#### `GET /student/filtered/:perPage/:pageNumber/:status/:firstName/:lastName/:courseCompletion/:courseEngagement/:projectDegree/:teamProjectDegree/:expectedTypeWork/:expectedContractType/:minNetSalary/:maxNetSalary/:canTakeApprenticeship/:monthsOfCommercialExp/:email`

<p> 
  Returns the list of students depends on the entered criteria. Criteria set to null are omitted by the service, so the request with null params results with the list of all students. Requires signed in user with HR role.
</p>

#### `PATCH /student/password`

<p> 
  Changes the current signed in user password. Requires signed in user regardless of the user's role.
</p>
<p>
Accepting JSON:

```javascript
{ 
	"password": "password"
}
```
</p>

<!-- Getting Started -->

## :toolbox: Getting Started

<!-- Prerequisites -->

### :bangbang: Prerequisites

This project uses npm as package manager

<!-- Run Locally -->

### :running: Run Locally

**IMPORTANT**
- Put https://github.com/GramosTV/megak-head-hunter-15-server and https://github.com/GramosTV/megak-head-hunter-15-client in one folder for the shared types to work.


**Before you start, make sure to create megak-head-hunter-15 mysql database** (typeorm will take care of the tables)

Clone the project

```bash
  git clone https://github.com/GramosTV/megak-head-hunter-15-server.git
```

Go to the project directory

```bash
  cd megak-head-hunter-15-server
```

Install dependencies

```bash
  npm install
```

Launch mysql

```bash
  If you didn't notice the important message above, create megak-head-hunter-15 mysql database (typeorm will take care of the tables)
```

Start the server

```bash
  npm run start/nest start
```

<!-- Deployment -->

### :triangular_flag_on_post: Deployment

To deploy this project run

```bash
  nest build
```

<!-- Roadmap -->

<!-- ## :compass: Roadmap

<!-- License -->

## :warning: License

Distributed under the MIT License. See LICENSE.txt for more information.

<!-- Contact -->

## :handshake: Contact

Email - emeraldbob020@gmail.com
Discord - GramosTV#2410

Project Link: [https://github.com/GramosTV/megak-head-hunter-15-server](https://github.com/GramosTV/megak-head-hunter-15-server)

<!-- Acknowledgments -->

## :gem: Acknowledgements

- [NestJS](https://nestjs.com)
- [MySQL](https://www.mysql.com)
- [TypeORM](https://typeorm.io)