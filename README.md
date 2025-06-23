## CRM Demo

The `App` now showcases a lightweight CRM dashboard built with React and TypeScript.
All API calls are mocked using **Mock Service Worker** so the UI works offline.

### Available Features
- Lead table with status filter and modal details powered by a mocked GraphQL query.
- Sidebar chat list with real-time conversation mocked on the client.
- AI call notes that send a transcript to a fake summarization endpoint with a simulated delay.
- Analytics rendered with Recharts including a bar chart and conversion pie chart.
- Simple component library page demonstrating reusable UI elements.

Run the dev server with `npm run dev` and open the browser to interact with the dashboard.


## Dashboard Entry Point

The dashboard mounts on the `#root` element in **index.html** and loads the app from **src/main.tsx**:

```html
<div id="root"></div>
<script type="module" src="/src/main.tsx"></script>
```

Start the development server and open your browser to view the dashboard:

```bash
npm run dev
```

## Continuous Integration

This project uses GitHub Actions to lint and test each push and pull request.
The workflow installs dependencies with `npm ci`, runs the linter, and executes
unit tests. Node modules are cached between runs to speed up the process.

## Formatting

Run Prettier to format the codebase:

```bash
npm run format
```

## Running tests

Execute the test suite with:

```bash
npm test
```

