import { $, lowBattery } from "@:js/plugins/_global.js";
import Common from "@:js/plugins/_common.js";
import TopPage from "@:js/pages/_index.js";

import basicAuth from "@:js/plugins/_basicAuth.js";
basicAuth();

class App {
  constructor() {
    this.appArray = [];
    this.init();

    const common = new Common();
    this.appArray.push(common);

    const topPage = new TopPage();
    this.appArray.push(topPage);

    this.allInit();
    lowBattery();
  }
  allInit() {
    this.appArray.forEach((app) => {
      app.init();
    });
  }

  init() {
    // console.log("Hello World");
    this.breakpointReload();
  }
  breakpointReload() {
    let width = window.innerWidth;
    window.addEventListener("resize", () => {
      const oldWidth = width;
      width = window.innerWidth;
      if (width < 767 && oldWidth >= 767) {
        location.reload();
      }
      if (width >= 767 && oldWidth < 767) {
        location.reload();
      }
    });
  }
}

window.addEventListener("load", () => {
  new App();
});
