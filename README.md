<p align="center"><img src="https://i.imgur.com/X7dSE68.png"></p>

## MacOS application running

After installation of application from provided build artifact, you will encounter "„B2B PDFs” is broken and can't be opened" error.

To remove the error, you need to run:
```sh
$ sudo xattr -r -d com.apple.quarantine B2B\ PDFs.app

eg. sudo xattr -r -d com.apple.quarantine /Applications/B2B\ PDFs.app
```
in order to allow application to run without need of signing the application itself.

## Usage

### Create an App

```
# with npx
$ npx create-nextron-app my-app --example basic-lang-javascript

# with yarn
$ yarn create nextron-app my-app --example basic-lang-javascript

# with pnpm
$ pnpm dlx create-nextron-app my-app --example basic-lang-javascript
```

### Install Dependencies

```
$ cd my-app

# using yarn or npm
$ yarn (or `npm install`)

# using pnpm
$ pnpm install --shamefully-hoist
```

### Use it

```
# development mode
$ yarn dev (or `npm run dev` or `pnpm run dev`)

# production build
$ yarn build (or `npm run build` or `pnpm run build`)
```
