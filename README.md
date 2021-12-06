## Running locally

1. Create a file called `.env.local` at the root level of this project. That's probably where this file is located.
2. Add a variable called `CONFIG_DIR`.  The value should be the directory of your configs are.
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

## Notes
- Only attempt to parse json files
- If it can't parse a certain file, it will log that and move on to the next file
- Only looks in a single directory, specified by the `CONFIG_DIR` environment variable
- Attempts to parse all json files in `CONFIG_DIR`
