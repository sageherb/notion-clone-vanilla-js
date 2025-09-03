export function createRouter() {
  const routes = {};

  return {
    addRoute: (path, page) => {
      let param = null;

      const parsedPath = path.replace(/:(\w+)/, (_, paramName) => {
        param = paramName;
        return "([^/]+)";
      });

      const regex = new RegExp(`^${parsedPath}$`);

      routes[path] = { regex, page, param };
    },
  };
}
