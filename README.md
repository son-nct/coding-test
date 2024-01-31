# Coding Project

- Infinite Scrolling and Searchable Product List
- **Link Demo**: https://son-nct.netlify.app

## Table of Contents

- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Composables](#composables)
- [Unit Testing](#unit-testing)
- [Project Setup](#project-setup)

## Tech Stack

This project is built using the following technologies:

- **Vue3**
- **TailwindCSS**
- **Pinia**: Store library and state management framework for Vue.js.
- **ShadcnUI**: A UI library for Vue.js (specific to this project).
- **Vue-Masonry-Wall**: A Vue component for creating masonry layout.
- **Axios**: A promise-based HTTP client for making HTTP requests.

## Folder Structure

I am using an atomic design pattern for my folder structure:

- **UI (ShadcnUI specific)**: A separate folder created by ShadcnUI. Contains individual components like buttons, spinner, toasts.
- **Molecules**: Comprises multiple atoms combined together.
- **Organism**: Consists of multiple molecules combined.
- **Template**: Holds the layout for setting the position and style of components.
- **Page**: Includes all layouts and components to compose a full page.

## Composables

This folder stores reusable functions:

- **useFetch**: A custom axios hook for API calls.
- **usePagination**: Contains functions related to pagination.
- **useUtils**: Stores various common utility functions. Examples include: formattedCurrency, handleInfiniteScroll.

## Unit Testing

**Vitest**: I am using Vitest for unit testing to ensure code quality and reliability.

- **buildProductAPIConfig Function**:
  - Ensures API configuration adapts based on the search value provided.
- **fetchPaginatedProducts Function**:
  - Testing successful retrieval of products, both with and without a search value.
  - Handling errors appropriately, including showing a toast notification when an error occurs.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
