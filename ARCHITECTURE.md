# Project Architecture

```
pkg (root)
├── lerna.json
├── package.json
├── README.md
├── VERSIONING.md
├── ARCHITECTURE.md
├── example.js
└── components/
    ├── button/
    │   ├── package.json (@myorg/button)
    │   ├── index.js
    │   └── scripts/
    │       └── build.js
    ├── card/
    │   ├── package.json (@myorg/card)
    │   ├── index.js
    │   └── scripts/
    │       └── build.js
    └── header/
        ├── package.json (@myorg/header)
        ├── index.js
        └── scripts/
            └── build.js
```

## Component Dependencies

```
@myorg/card
└── @myorg/button (^1.1.1)

@myorg/header
└── (no dependencies)

@myorg/button
└── (no dependencies)
```

## Key Features

1. **Independent Versioning**: Each component can be versioned independently using Lerna's "independent" mode
2. **Automatic Dependency Updates**: When a dependency is updated, Lerna automatically updates the dependent packages
3. **NPM Publishing**: Each component can be published as a separate NPM package under the `@myorg` scope
4. **Workspace Support**: Uses NPM workspaces for local development and linking
5. **Build Scripts**: Each component has its own build process