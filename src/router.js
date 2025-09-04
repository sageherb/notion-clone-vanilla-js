export function createRouter() {
  const routes = [];

  const getRegex = (path) => {
    const pattern = path.replace(/:id\b/, "([^/]+)");
    if (pattern === "/") return /^\/$/;
    return new RegExp(`^${pattern}/?$`);
  };

  const resolveRoute = () => {
    const { pathname } = location;

    for (const route of routes) {
      const match = route.regex.exec(pathname);

      if (match) {
        return route.handler({ id: match[1] || null });
      }
    }
  };

  const navigate = (path) => {
    history.pushState(null, null, path);
    resolveRoute();
  };

  const handleLinkClick = (event) => {
    const a = event.target.closest("a");
    if (a && a.href.startsWith(location.origin)) {
      event.preventDefault();
      navigate(a.getAttribute("href"));
    }
  };

  return {
    addRoute(path, handler) {
      const regex = getRegex(path);
      routes.push({ path, handler, regex });
    },
    navigate,
    start() {
      window.addEventListener("popstate", resolveRoute);
      document.body.addEventListener("click", handleLinkClick);
      resolveRoute();
    },
  };
}
