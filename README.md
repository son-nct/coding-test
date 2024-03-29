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
- **assets**: Contains static resources like images, fonts, and styles, essential for the visual consistency of the app.
- **router**: Configures Vue Router for defining the app's navigation structure.
- **store**: Includes Pinia store files for state management, enabling reactive and efficient state sharing.
- **type**: TypeScript type definitions and interfaces for data modeling.
- **ui (ShadcnUI specific)**: A separate folder created by ShadcnUI. Contains individual components like buttons, spinner, toasts.
- **molecules**: Comprises multiple atoms combined together.
- **organisms**: Consists of multiple molecules combined.
- **templates**: Holds the layout for setting the position and style of components.
- **pages**: Includes all layouts and components to compose a full page.

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

### Create a .env file in the root directory of project.
- Add the following line to .env file:

```sh
VITE_BASE_URI='https://dummyjson.com'
```

![Image instructions](https://i.ibb.co/715cztB/Screen-Shot-2024-02-02-at-21-07-56.png "Image instructions")

### Install Dependencies

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```
