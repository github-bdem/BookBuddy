## Running locally:

Project built with Vite, so more detailed run/build information is available at their [rundocs](https://vite.dev/guide/)

```bash
npm i
npm run dev
```

if you get an engine unsupported error try either installing the recommended node version, or remove

```json
"node": "22.13.1"
```

from `package.json`

## Submission Notes

To save time I used my existing front end [Template Repository](https://github.com/github-bdem/vite-react-tailwind-project-template).

I wasn't sure what the `or` meant under persistent reading list, my solution persists the readingList state to `localStorage` see `ReadingListContextProvider` for details.

I probably could have memoized the search or list views but I ran out of time.

### Omitted approach

I originally used zod for the search form, but then realized you all probably wanted us to use plain react so I scrapped that. That form work can be [seen here](https://github.com/github-bdem/BookBuddy/blob/oops-used-zod/src/pages/Search.tsx).

### Final Notes

I ran out of time before adding tests, feel free to check out some of the tests in a similar project I have if [you're interested](https://https://github.com/github-bdem/food-roulette/blob/main/src/components/ResultsSidebar/tests/ResultsSidebar.test.tsx)
