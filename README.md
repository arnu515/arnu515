[![MIT License](https://img.shields.io/badge/license-MIT-blue)](https://choosealicense.com/licenses/mit/) ![Version](https://img.shields.io/github/package-json/v/arnu515/arnu515)

# [arnu515](https://arnu515.gq)

This is the source code for my website, and also, my public Github Profile.

[Visit my website](https://arnu515.gq)

## 🚀 About me

I am a 16 year old self-taught web developer in 🇮🇳 India. I build websites and web applications.

This repository contains the source code of my website, built by me, using [NextJS](https://nextjs.org) and [Directus CMS](https://directus.io).

## 🔗 Links

[![DEV.to](https://img.shields.io/badge/DEV.TO-arnu515-333?style=for-the-badge)](https://dev.to/arnu515) [![Website](https://img.shields.io/badge/WEBSITE-arnu515.gq-green?style=for-the-badge)](https://arnu515.gq) [![Twitter](https://img.shields.io/badge/TWITTER-arnu5152-blue?style=for-the-badge)](https://twitter.com/arnu5152)

## 🛠 Skills

### Languages

- Javascript
- Typescript
- Python
- Java
- Ruby
- Elixir
- Rust

### Frontend Web Development

- ReactJS
- NextJS
- VueJS
- Svelte
- SvelteKit
- Gatsby (learning)
- Angular (learning)

### Backend Web Development

- ExpressJS
- Fastify
- FeathersJS
- NestJS (learning)
- Flask (Python)
- FastAPI (Python)
- Spring (Java) (learning)

### Devops

- Docker
- Kubernetes (learning)
- Github Actions
- Gitlab CI/CD
- Vagrant
- Linux

### Desktop/Mobile Development

- React Native
- Nativescript (learning)
- Electron (learning)
- QuasarJS (learning)

## Contributors

- [@arnu515](https://www.github.com/arnu515)

### Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

## Tech Stack

TBA

## Run Locally

> You will need a Postgres database to run this application. Be sure to create `.env` files based on the `.env.example` files in both the frontend and `cms`.

Clone the project

```bash
$ git clone https://github.com/arnu515/arnu515.git
$ cd arnu515
```

Install dependencies

```bash
$ yarn # preferred package manager. Use npm if you wish
$ cd cms && yarn && cd .. # install dependencies for directus
```

Start the server

```bash
# Frontend
$ yarn dev # 🚀 on https://localhost:3000

# CMS
$ cd cms && yarn dev # 🚀 on https://localhost:8055
```

If you use VSCode, there are 2 tasks, `cms:dev` and `frontend:dev` that are configured. You can run them with `CTRL+B`.
