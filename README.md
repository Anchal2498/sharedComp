# Component Library Monorepo

This is a monorepo containing multiple UI components that can be published as separate npm packages.

## Architecture

- `/components/button` - A reusable button component (@myorg/button)
- `/components/card` - A card component that uses the button component (@myorg/card)
- `/components/header` - A header component (@myorg/header)

## How It Works

Each component has its own `package.json` file and can be published independently to npm.

When a component is updated, Lerna can automatically update the versions of dependent components. For example, if `@myorg/button` is updated from version 1.1.1 to 1.2.0, Lerna can automatically update the dependency version in `@myorg/card`.

## Commands

- `npm run build` - Build all packages
- `npm run test` - Test all packages
- `npm run publish` - Publish updated packages to npm

## Publishing

To publish packages:
1. Make changes to one or more components
2. Run `npx lerna version` to bump versions
3. Run `npx lerna publish` to publish to npm

This will automatically update the versions of dependent packages and publish them accordingly.

<!-- npm run build
npx lerna version
npx lerna publish -->