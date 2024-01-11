# React ThreeFiber + bitECS Starter (TypeScript)

This project is a demo about how to integrate a [bitECS](https://github.com/NateTheGreatt/bitECS) world with a [React Three Fiber](https://github.com/pmndrs/react-three-fiber) rendering to display your simulations (or games) inside a web browser. This can be used as a starter project as well. Be sure to read both documentations!

It is powered by Vite, so the usual Vite commands apply:

- `npm run dev` to serve a development version at `localhost:5173`
- `npm run build` to produce a build output into the `dist` folder
- `npm run preview` to preview the production build at `localhost:4173`

## Folder structure

Since there's collision in the naming of "components" from both the React library and the ECS pattern, the project files have been split in two:

- the `views` folder containing the React / React Three Fiber related components
- the `logic` folder containing the compnents, queries and systems from
