## Session Three - Routing and external APIs
In this final session, we'll use Routing to allow users to navigate directly to a desired Pokémon using the page's URL. And, we'll investigate how we can pull our Pokédex data from an external API rather than a local file. We'll look at how we can render different UI elements depending on whether or not there are any errors, and / or whether data is still loading from our external source.

### 3A) Getting Ready for Routing
In this exercise, we'll use React Router 6 to enable us to browse to specific Pokémon based on their `id`. For example, when we browse to <http://localhost:3000/1>, Bulbasaur's data will be shown.

Firstly, we need to install React Router:

```sh
npm install --save react-router-dom
```

Next, within `index.js`, surround our `<App />` in a `<BrowserRouter>`, to enable routing:

```jsx
<React.StrictMode>
<BrowserRouter>
    <App />
</BrowserRouter>
</React.StrictMode>
```

Next, we'll refactor our app slightly. Move everything currently within `App.js` into a new compoment, called `MainPage`. Simply render that compoment within `App.js` for now, to check everything still works. We have done this because we want to use `App.js` exclusively to handle our routing logic, which we will add later on.

### 3B) Routing
Now, we'll start to implement our routes. First, have `App.js` return a `Routes` compoment. That component should have a single child - a `Route` component - whose `path` is `/` (i.e. the root), and which will render the `MainPage` as its `element`.

Within that `Route`, we should define a child route, whose `path` is `:id`. Paths with colons `:` are *path params*, and we can access their values within those paths' `element`s. This child route's element should be our `PokemonDetail` component.

```jsx
<Routes>
    <Route path="/" element={<MainPage />}>
    <Route path=":id" element={<PokemonDetail />} />
    </Route>
</Routes>
```

This routing setup will *always* render the `MainPage`, and will also render the `PokemonDetail` component when an id (or something that *looks* like an id) is supplied in the URL.

We also need to remove the `PokemonDetail` component from `MainPage` itself, and replace it with React Router's `<Outlet>` component. This is where React Router will render the `PokemonDetail` component inside `MainPage`:

```jsx
function MainPage() {

  ...

  return (
    <div>
      <h1>WDCC Pokédex</h1>
        ...

        <PokemonList ... />

        <Outlet />

        ...
    </div>
  );
}
```

*(the above is just a partial snippet - your code will look different, depending on how you styled it in session two)*

Once we've set that up, if we navigate to <http://localhost:3000/>, we'll see just our `PokemonList`, with no `PokemonDetail` view. However, if we supply an id on the end of the URL - for example, <http://localhost:3000/1> - the `PokemonDetail` component will be rendered too! However, at this point, this will likely crash your app in the browser at this point, because `PokemonDetail` was expecting us to supply a `pokemon` prop, which we're not doing anymore We'll fix this in the next steps.

### 3C) Accessing route params
Rather than supplying a `pokemon` prop to `PokemonDetail`, we are now specifying the Pokémon to display via the `id` path param. In this step and the next one, we will refactor our app to get it working again.

Firstly, we can obtain the `id` path param using the `useParams()` hook from React Router, like so:

```js
const { id } = useParams();
```

Modify your `PokemonList` to display this value somewhere, just so we can see that it's working. Remove any reliance on a `pokemon` prop at this time, too.

You'll notice that we no longer have access to any Pokémon data to display, other than its `id`. We'll fix that soon! For now, display some dummy data just so your UI still looks ok. A good placeholder image you can use is <https://trex-sandwich.com/wdcc-workshop/images/Placeholder.png>.

### 3D) Links
Let's also modify our `PokemonList` component, and our `MainPage`, to remove all references to our `currentPokemon` state. We don't need that stateful value any more, because the id of the current pokemon is now contained within the app's URL, as a path param.

Instead, within `PokemonList`, for each list item, render a React Router `<Link>`, whose `to` prop is set to the corresponding Pokémon's `id`. We will want to convert the `id` to a string, because values supplied to `to` must be strings. We can do this easily using its `toString()` method, or string literals. For example:

```jsx
<li><Link to={pokemon.id.toString()}>{pokemon.name}</Link></li>
```

If you like, you can use `NavLink`s instead of `Link`s. The main difference is that they allow us to style the links differently, depending on whether those links are currently "active". See [this page](https://reactrouter.com/docs/en/v6#navlink) for further details.

Now, clicking on any of the `PokemonList` items will cause a *client-side navigation* (fast, doesn't result in a page refresh) to the URL corresponding to that Pokémon.

### 3E) Getting data from the web
In this step, we'll use `fetch()` to fetch data from an online service (trex-sandwich), rather than having that data stored in `pokemon.json`. We will fetch data in two places:

1. In `PokemonList`, we'll fetch a list of `id`s and `name` of all Pokémon
2. In `PokemonDetail`, we'll fetch a particular Pokémon with the `id` matching the path param.

Firstly, let's add a custom hook to our app: `useGet()`. This will allow us to reuse code associated ith sending `GET` requests to retrieve data. You can copy the following code into a file - the code was demonstrated in session three's live demo.

```jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useGet(url, initialState = null) {

    const [data, setData] = useState(initialState);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(false);
            try {
                const response = await axios.get(url);
                setData(response.data);
                setLoading(false);
            } catch {
                setError(true);
                setLoading(false);
            }
        }
        fetchData();
    }, [url]);

    return { data, isLoading, error };
}
```

Now, within `PokemonList`, obtain the required data from <https://trex-sandwich.com/wdcc-workshop/api/pokemon> instead of a supplied `list` prop, and remove anything to do with `pokemon.json` from `App.js`. `useGet()`'s initial state can be an empty array `[]`.

Finally, within `PokemonDetail`, obtain the full details of a Pokémon from https://trex-sandwich.com/wdcc-workshop/api/pokemon/:id, where `:id` is the path param we obtain from `useParams()`. This time, also consider the following:

- We should display something different (perhaps a blank component, or a "Loading..." message, or similar) while  the data is still loading. The return value from `useGet()` has an `isLoading` property that can assist us with this.

- We should display something different again, if an error occurs - for example, if the user browses to a Pokémon that doesn't exist. The return value from `useGet()` has an `error` property which can help us with this.