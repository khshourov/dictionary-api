<a id="readme-top"></a>


<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Dictionary API</h3>

  <p align="center">
    This project provides a web interface around npm package <a href="https://www.npmjs.com/package/dictionary-scraper">dictionary-scraper</a>
    <br />
    <a href="https://github.com/khshourov/dictionary-api/wiki"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="#">View Demo</a>
    ·
    <a href="https://github.com/khshourov/dictionary-api/issues/new?assignees=&labels=&projects=&template=bug_report.md&title=">Report Bug</a>
    ·
    <a href="https://github.com/khshourov/dictionary-api/issues/new?assignees=&labels=&projects=&template=feature_request.md&title=">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This project is primarily built on the [dictionary-scraper](https://www.npmjs.com/package/dictionary-scraper) npm package. It enhances the package’s functionality by adding caching and access information. Additionally, it provides Google authentication to allow the application to store records for each user. The application also includes a minimal web interface, providing users with exactly what they need.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Nest][NestJS]][NestJS-url]
* [![React][React.js]][React-url]
* [![Postgresql][Postgresql]][Postgresql-url]
* [![Docker][Docker]][Docker-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* Node.js 22
* Docker
* Google OAuth 2.0 secret. Go to [Google Cloud](https://console.cloud.google.com) to create your own client-id and client-secret.
* Postgresql

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Installation

#### - Local installation (without docker)
1. Copy .env.example to .env.production and set all the necessary properties.
2. Run `yarn app:install`.
3. Run `yarn start:prod` to launch the application.

Visit [http://localhost:3000](http://localhost:3000) to access the web page.

#### - Local installation (with docker-compose)
The docker-compose.yml file includes a PostgreSQL container, so no additional setup is needed to configure a database.

1. Copy .env.example to .env and set all the required properties.
2. Run `docker-compose up migrate --build && docker-compose down migrate --rmi local --volumes`. This command will start the PostgreSQL server, create the database, and set up the necessary tables.
3. Start the application container with  `docker-compose up app -d --build`

Visit [http://localhost:3000](http://localhost:3000) to access the web page.

#### - Local installation (with docker)
This installation only creates the app container. You will need to set up your own PostgreSQL instance separately.

1. Copy .env.example to .env and set all the required properties.
2. Run `docker-compose up migrate --build && docker-compose down migrate --rmi local --volumes`. This command will start the PostgreSQL server, create the database, and set up the necessary tables.
3. Build app image: `docker build -t app .`
4. Start the application container with `docker run -d --name app --env-file .env -p 3000:3000 app`

Visit [http://localhost:3000](http://localhost:3000) to access the web page.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Delete/Export data

See the [open issues](https://github.com/khshourov/dictionary-api/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Kamrul H Shourov - shourov.kamrul@gmail.com

Project Link: [https://github.com/khshourov/dictionary-api](https://github.com/khshourov/dictionary-api/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Docker image size optimization](https://dev.to/andreasbergstrom/configure-typeorm-migrations-in-5-minutes-2njg)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[NestJS]: https://img.shields.io/badge/-NestJs-ea2845?style=flat-square&logo=nestjs&logoColor=white
[NestJS-url]: https://nestjs.com/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Postgresql]: https://img.shields.io/badge/postgresql-4169e1?style=for-the-badge&logo=postgresql&logoColor=white
[Postgresql-url]: https://www.postgresql.org/
[Docker]: https://img.shields.io/badge/docker-257bd6?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com
