## Session Four - Extensions
Well done - You've completed the WDCC React workshop! Now, we encourage you to keep up the practice! One way you can do this is by extending the Pokédex app. Some ideas are given here - but the sky's the limit!

- **Auto-navigate to a Pokémon on page load**: Currently, when we navigate to <http://localhost:3000/>, we see a blank screen with just our `PokemonList`. Instead, we could automatically navigate to a Pokémon - perhaps the Pokémon with `id` = 1 (or perhaps your favorite 'mon). React router's [`<Navigate>` component](https://reactrouter.com/docs/en/v6/components/navigate), or [`useNavigate()` hook](https://reactrouter.com/docs/en/v6/hooks/use-navigate), can assist with this.

- **Caching**: Currently, if we browse to a particular Pokémon, a new web request will be made, even if we've already navigated to that Pokémon before. Consider how you can refactor your app so that it doesn't need to send each request more than once.

- **Local storage**: Adding on to the above, investigate how you might use [local browser storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to cache data even across page refreshes / reloads.

- **Service workers**: Alternatively, [service workers](https://developers.google.com/web/tools/workbox) could be used to provide very fine-grained control over caching of web requests, and can also be used to make your app available "offline".

- **Adding Pokémon**: Sending a `POST` request to <https://trex-sandwich.com/wdcc-workshop/api/pokemon> with a `name`, `dexEntry`, and (optionally) `imageUrl` in the request body (formatted as JSON) will result in a new Pokémon being added to the database, for all to see! See if you can add a new page to your webapp, to enable users to add new entries. If you do this, consider how you will also cause the `PokemonList` to update itself when the new 'mon is added. It might pay to refactor how our application state is being stored (see next bullet)!

- **Globalizing state**: Currently, we're storing the Pokémon list inside the `PokemonList` component, after loading it from the web. However, if we ever need to modify that list from elsewhere in the application, things will get tricky. To alleviate this issue, investigate how we can globalize this state, so it can be accessed and modified from anywhere within our app. We can do this useing React's [Context api](https://reactjs.org/docs/context.html), or with a third-party library such as [Redux](https://redux.js.org/).