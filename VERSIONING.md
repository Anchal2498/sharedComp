# Automatic Version Updates

This monorepo uses Lerna to manage versioning and automatic updates between dependent packages.

## How It Works

When a component is updated and published, Lerna can automatically update the versions of dependent components. Here's how it works:

1. **Version Bumping**: When you make changes to a component like `@myorg/button` and want to publish a new version, Lerna will prompt you to select the new version (major, minor, patch).

2. **Dependency Updates**: If `@myorg/card` depends on `@myorg/button` and you update the button component, Lerna will automatically update the dependency version in the card's package.json.

3. **Publishing**: When you run `npx lerna publish`, Lerna will:
   - Detect which packages have changed
   - Prompt for new versions
   - Update dependency versions in dependent packages
   - Publish all updated packages to npm

## Example Workflow

Let's say you've made changes to the button component:

1. Run `npx lerna version` to bump the version of the button component
2. Lerna detects that the card component depends on the button
3. Lerna automatically updates the button dependency version in the card's package.json
4. Both packages get new version numbers
5. Run `npx lerna publish` to publish both packages to npm

This ensures that when someone installs the latest version of `@myorg/card`, they'll automatically get the updated version of `@myorg/button` that it was tested with.

## Commands

- `npx lerna version` - Bump versions of changed packages
- `npx lerna publish` - Publish packages to npm
- `npx lerna changed` - Check which packages have changed since last release

This system ensures that dependencies are always up-to-date and compatible with each other.