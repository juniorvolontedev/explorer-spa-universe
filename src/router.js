export class Router {
  routes = {};

  add(routeName, page) {
    this.routes[routeName] = page;
  }

  route(event) {
    event = event || window.event;
    event.preventDefault();

    window.history.pushState({}, "", event.target.href);

    this.handle();
  }

  handle() {
    const { pathname } = window.location;
    const route = this.routes[pathname] || this.routes[404];

    const body = document.querySelector("body");
    const bodyClass = pathname.slice(1) || "home";

    const menuLinks = document.querySelectorAll("nav a");

    body.classList.remove("home");
    body.classList.remove("universe");
    body.classList.remove("explore");

    body.classList.add(bodyClass);

    menuLinks.forEach((link) => {
      if (link.getAttribute("href") === pathname) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.querySelector("#app").innerHTML = html;
      });
  }
}

export default new Router();
