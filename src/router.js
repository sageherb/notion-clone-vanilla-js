export function createRouter() {
  const routes = [];

  const getRegex = (path) => new RegExp(`^${path.replace(/:id\b/, "([^/]+)")}$`);

  const matchRoute = () => {
    const { pathname } = location;

    const route = routes.find((route) => route.regex.test(pathname));
    if (!route) return "404";

    const match = pathname.match(route.regex);
    if (!match) throw new Error("error");

    const id = match[1];

    const result = { page: route.page };
    if (id) result.id = decodeURIComponent(id);

    return result;
  };

  return {
    addRoute(path, page) {
      const regex = getRegex(path);
      routes.push({ path, page, regex });
    },
  };
}
