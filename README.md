# [`asouthdev`](https://asouthdev.co.za/)

This is a simple website mimicking a bash terminal.
It was initially created to test out Google's App Engine, but now I use it as my personal site.

It was created using Vite + React + TypeScript and it is hosted using GitHub Pages.

## Features

The idea in nature is to copy/mimic what a bash terminal would be like, but not in its entirety.
As such, you can:

- Run commands like `rm`, `cd`, `cat`, `ls`, etc.
- Run some more obscure commands like `sudo ufw status` and see a realistic response.
- You can check the code for the other possible commands/secret commands...

But you _cannot_:

- Actually modify/create files or directories.
- Perform external requests (like using `curl`).
- Keep any session independant changes.
- Navigate history (as of writing this).

## Development

```bash
# Install dependencies
npm ci

# Run for development
npm run dev

# Build for production
npm run build

# Optionally: You can lint and format your code
npm run lint
npm run format
```

## Deployment

The workflow for deploying can be found under `.github/workflows/deploy-to-pages.yml`.

## License

[GNU General Public License v3.0](./LICENSE).
