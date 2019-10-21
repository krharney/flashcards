# Flashcard Hub

MERN full stack application for for flashcards.

## Description

User can create flashcards by naming a set, front, and back of the card. Vocabulary cards can have the back auto-generated from Merriam-Webster API. Flashcards will be displayed randomly from a selected set. After checking the answer, the user can rate their familiarity with the card. Higher rated cards will be displayed less frequently.

## Building and running on localhost

First install dependencies: npm install

To run in hot module reloading mode:

```sh
npm start
```

To create a production build:

```sh
npm run build-prod
```

To create a development build:

```sh
npm run build-dev
```

To run a production server:

```sh
npm run server-prod
```

To run a development server:

```sh
npm run server-dev
```

Create a config.js file containing an exported `API_KEY` with the [Merriam-Webster API](https://dictionaryapi.com/)

## Running

Open `http://localhost:3000/` in your browser

## Credits

Made with [createapp.dev](https://createapp.dev/)
