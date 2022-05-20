# WDCC Workshop - React Lab
In this lab, we'll get practical experience with React, by putting together a simple Pokédex application.

- In the first session, we'll build some React components to represent the Pokédex. We'll start by displaying some hardcoded data, then move on to displaying the actual data contained within the provided [`pokemon.json`](./src/pokemon.json) file.

- In the second session, we'll allow our app to change its *state* in response to user input, by displaying different Pokémon data when the user clicks different elements on-screen. Then, we'll unleash our creative juices, and style our 'dex to give it a personal touch.

- In the final session, we'll use Routing to allow users to navigate directly to a desired Pokémon using the page's URL. And, we'll investigate how we can pull our Pokédex data from an external API rather than a local file.


## Installation
Before starting, you'll need to install all dependencies for the project using `npm`. To do this, open a terminal window in the project root (the same folder containing this `README.md`), and run `npm install`. Once that's done, you can run `npm start` to load the your app within the browser. You'll see a single `<h1>` with the text "Your app here!", as rendered from within `App.js`.

Whenever you modify your JS code and save, `create-react-app`'s hot reload feature will automatically cause the browser to refresh and display the latest version of the app - or, any errors, if there are any. Most of the time, you'll only need to stop the dev server running if you're done coding for the session, or if you need to install other dependencies (which we will be doing in session 3 today).


## Sessions

1. [Session One - A basic Pokédex](./spec/Session-01.md)

2. [Session Two - A prettier product](./spec/Session-02.md)

3. [Session Three - Routing and External APIs](./spec/Session-03.md)

4. [Session Four - Extensions](./spec/Session-04.md)
