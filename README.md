## SWE Project



### Problems

#### tsconfig-paths

- Add baseUrl and paths mappings(paths) in `tsconfig.json`
- Add sourceRoot and tsConfigPath in `nest-cli.json`
- Add rootDir, roots and path mapings(moduleNameMapper) inside jest config in `package.json`
- Add rootDir and path mapings(moduleNameMapper) inside in `jest-e2e.json`
---

#### nest-cli.json

Webpack: false - tsc compiler is used and file bundling is disabled

# [Config options](https://docs.nestjs.com/cli/monorepo)
---

#### Entities register
`DatabaseModule` is not using entities array and instead is using the global path to the entities. (Look at the `DatabaseFactory` entities)

If Webpack is enabled all files are bundled in one and there is no entity.js file, and in the DatabaseFactory entities array should be used.

If you want to use the global path to the entities you should disable Webpack(Look at the previous problem).
---
