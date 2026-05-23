const hasRoute = (routes: string[], path: string): boolean => {
  return routes.some((route) => {
    if (route.endsWith("/*")) {
      const baseRoute = route.replace("/*", "");
      return path.startsWith(baseRoute);
    }
    return path === route;
  });
};

const buildUrl = (route: string, root: string) => {
  const absoluteURL = new URL(route, root);
  return absoluteURL.toString();
};

export { hasRoute, buildUrl };
