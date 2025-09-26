type Route = {
  path: string;
  handler: (id?: string) => void | Promise<void>;
  regex: RegExp;
};

export function createRouter() {
  const routes: Route[] = [];

  const getRegex = (path: string) => {
    const pattern = path.replace(/:id\b/, "([^/]+)");
    if (pattern === "/") return /^\/$/;
    return new RegExp(`^${pattern}/?$`);
  };

  const resolveRoute = () => {
    const { pathname } = location;

    for (const route of routes) {
      const match = route.regex.exec(pathname);
      if (!match) continue;

      const id = match[1];
      if (id) route.handler(id);
      else route.handler();
      return;
    }
  };

  const navigate = (path: string) => {
    history.pushState(null, "", path);
    resolveRoute();
  };

  const handleLinkClick = (event: PointerEvent) => {
    const t = event.target as HTMLElement;
    const a = t.closest("a");
    if (a && a.href.startsWith(location.origin)) {
      event.preventDefault();
      const href = a.getAttribute("href");
      if (href) navigate(href);
    }
  };

  return {
    addRoute(path: Route["path"], handler: Route["handler"]) {
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
