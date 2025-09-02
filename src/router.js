export function createRouter() {
  const routes = {};
  let currentRoute = null;

  return {
    addRoute: (path, page) => {
      routes[path] = page;
      currentRoute = routes[path];
    },
    getCurrentRoute: () => currentRoute,
  };
}
