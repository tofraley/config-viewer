## Running locally

1. Create a file called `.env.local` at the root level of this project. That's probably where this file is located.
2. Populate your new file with a variable called `CONFIG_DIR`.
```
CONFIG_DIR=c://path/to/configs
```
3. Run the development server:
```bash
npm run dev
# or
yarn dev
```
4. Open http://localhost:3000.

The server will only attempt to parse json files.  If it can't it will log that and move on.
