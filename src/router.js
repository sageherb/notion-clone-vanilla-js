export function createRouter() {
  const routes = [];

  const getRegex = (path) => {
    const pattern = path.replace(/:id\b/, "([^/]+)");
    if (pattern === "/") return /^\/$/;
    return new RegExp(`^${pattern}/?$`);
  };

  const matchRoute = () => {
    const { pathname } = location;

    const route = routes.find((route) => route.regex.test(pathname));
    if (!route) return "404";

    const match = pathname.match(route.regex);
    if (!match) throw new Error("error");

    const id = decodeURIComponent(match[1]);

    // 페이지 미구현
    // return route.page(id);
  };

  const handleLinkClick = (e) => {
    const a = e.target.closest("a");
    if (a && a.href.startsWith(location.origin)) {
      e.preventDefault();
      navigate(a.getAttribute("href"));
    }
  };

  const navigate = (path) => {
    history.pushState(null, null, path);
    matchRoute();
  };

  return {
    addRoute(path, page) {
      const regex = getRegex(path);
      routes.push({ path, page, regex });
    },

    start() {
      window.addEventListener("popstate", matchRoute);
      document.body.addEventListener("click", handleLinkClick);
      matchRoute();
    },
  };
}
