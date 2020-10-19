# Bits n' pieces

[Monorepo](https://www.google.com/search?q=what+are+monorepos%3F) for common JavaScript open 
source code by @Claudijo that has been set up using [Lerna](https://github.com/lerna/lerna)

## Working with packages

In general consult the documentation for the [Lerna project](https://github.com/lerna/lerna)
when working with packages. The following are some general and some project  specific pointers. 

### Add new package

Create a folder below packages with `src` and `dist` sub directories. During the build step files
in `src` will be transpiled using babel and put in `dist` 

```
`-- packages
    `-- email-utils
        |-- README.md
        |-- dist
        |   `-- index.js
        |-- package.json
        `-- src
            |-- index.js
            `-- test.js
```

The `package.json` file must include an user/organization scoped `name` and a `publishConfig` directive that 
grants public access. The main file should point to the entry point file in the `dist` folder. See 
minimal example below.

```json
{
  "name": "@claudijo/email-utils",
  "version": "1.0.5",
  "description": "Email utils",
  "repository": {
    "type": "git",
    "url": "https://github.com/claudijo/bits-n-pieces"
  },
  "main": "dist/index.js",
  "author": "Claudijo Borovic <claudijo.borovic@gmail.com>",
  "license": "MIT",
  "publishConfig": {
    "access": "public"
  }
}
```

### Add dependencies

The general syntax to add local or remove dependencies to packages is 
`lerna add <package>[@version] [--dev]`. This assumes `lerna` has been installed
globally (`npm i -g lerna`)

When run, this command will:
1) Add package to each applicable package. Applicable are packages that are not 
package and are in scope
2) Bootstrap packages with changes to their manifest file (package.json)

#### Examples

```
lerna add module-1 --scope=module-2 # Install module-1 to module-2
lerna add module-1 --scope=module-2 --dev # Install module-1 to module-2 in devDependencies
lerna add module-1 # Install module-1 in all modules except module-1
lerna add babel-core # Install babel-core in all modules
```

### Linking packages during development

To avoid having to do a full release cycle to consume updated packages and to have a convenient 
development setup packages can be symbolically linked using `npm link` or [`yarn link`](https://yarnpkg.com/lang/en/docs/cli/link/).

Tip: Run the build in watch mode to ensure that the package is being rebuilt when you are working on it.

```
cd to/common/lib
npm link
cd to/my/project 
npm link lib_name 
```

When you are done with development simply unlink the package:

```
cd to/my/project 
npm unlink lib_name 
```

#### Caveats 
If node has been installed in such a way that linking requires root privileges, see for instance
[this guide](http://justjs.com/posts/npm-link-developing-your-own-npm-modules-without-tears) on how 
to circumvent that issue and not having to run the link command as root. 

## Tests

Jest is used as a test platform. Run `npm test` to run them manually, or `npm run test:watch` to re-run
tests on change.

## Publish 

Files are published to npm, scoped to the @claudijo user/organisation (https://www.npmjs.com/org/claudijo). 
Publishing is intelligently done through `lerna` using the command `npm run publish`.

Note that you must be on the `master` branch to publish and `lerna` will let you know
if you try to publish on another branch.

## If packages require polyfills

Make sure to add a "Required polyfills" section in the README file for each package and list
polyfills needed by older browsers, or "none" if no polyfills are needed. 

Not bloating packages with polyfills makes it optional for consumers to add those if needed.

## Typical development cycle

* Update source code and tests
* Run `npm test` to test all packages.
* Run `npm run lint` to lint all packages.
* Run `npm run build` to transpiled source with babel and place built files in the `dist` folder of
the package.
* Commit and push changes to git.
* Run `npm run publish` to publish updated packages to npm. You will be prompted for how to bump 
updated packages´ version number.
* Rinse and repeat

## License

[MIT](LICENSE)
