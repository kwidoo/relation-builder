Relationships Builder

PHP
    - [x] Eloquent
    - [ ] Doctrine ORM

Python
    - [ ] Django
    - [ ] Other


Relationships Builder designed to facilitate the creation of Eloquent, Doctrine, Django relationships in your applications. 

Built with Vue 3, Vuetify, and TypeScript, this dynamic web interface provides a user-friendly environment to define and customize relationships like `hasOne`, `hasMany`, `belongsTo`, `morphToMany`, and more.

## Features

- **Dynamic Relationship Configuration**: Easily configure various types of relationships using a user-friendly web interface.
- **Support for Multiple Relationship Types**: Includes `hasOne`, `hasMany`, `belongsTo`, `belongsToMany`, `hasManyThrough`, `morphTo`, `morphMany`, and `morphToMany`.
- **Interactive UI**: Built with Vuetify, offering a responsive and intuitive design.
- **Local and Demo Installation**: Can be installed locally for development and testing or accessed via a live demo.

## Demo

Check out the live demo: [Relationships Builder Demo](https://rels.pashkovsky.me)

## Requirements

- Node.js (I use v21.7.3)
- npm or yarn
- Laravel environment (for local installation)

## Installation

### Local Installation

1. **Clone the Repository**

   ```bash
   git clonekwidoo/relation-builder.git
   cd relation-builder
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**

   - Ensure your Laravel backend is setup and running.
   - Configure any necessary environment variables, such as API endpoints.

4. **Serve the Application**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   This will compile and hot-reload for development.

   By default will be available on http://localhost:3000

### Using Docker

- [x] Add docker setup

    ```bash
        docker-compose up -d
    ```

## Usage

After installation, navigate to the main page where you can select the type of relationship you wish to configure. Fill in the required fields such as model names and keys, and the tool will dynamically generate the corresponding relationship methods.

### For Laravel

You can choose to either include generated code in your model or, by default, download a trait and use it in your model.

You can also select a namespace, if required.

- [ ] Allow saving, editing, and deleting namespaces
- [ ] Enable the generation of default scopes
- [ ] Allow the creation of migrations

## Contributing

Contributions are welcome! Please feel free to submit pull requests, or report bugs and suggest features via the issue tracker.

## License

This project is open-sourced software licensed under the MIT license.
