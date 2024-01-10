// ua
const ua = window.navigator.userAgent.toLowerCase();

export const is_edge = ua.indexOf("edge") !== -1;
export const is_ie =
  !is_edge &&
  (ua.indexOf("iemobile") !== -1 ||
    ua.indexOf("trident/7") !== -1 ||
    (ua.indexOf("msie") !== -1 && ua.indexOf("opera") === -1));

export const is_ios =
  ua.indexOf("iphone") >= 0 || ua.indexOf("ipad") >= 0 || ua.indexOf("ipod") >= 0;

// can use observer
export const isCanUseObserver = typeof IntersectionObserver === "function" ? true : false;

// touch device?
export const isTouchDevice = window.ontouchstart === null ? true : false;

// scroll stop & restart
let scroll_top;

export function stopBodyScroll() {
  scroll_top = document.documentElement.scrollTop || document.body.scrollTop;
  document.body.style.position = "fixed";
  document.body.style.top = -scroll_top + "px";
}

export function restartBodyScroll() {
  document.body.style.position = "static";
  document.body.style.top = 0;
  window.scrollTo(0, scroll_top);
}

export const cssVal = (property) => {
  return getComputedStyle(document.querySelector("html")).getPropertyValue(property);
};

// const allowedProperties = ["x", "y", "width", "height", "top", "right", "bottom", "left"];

export const $ = (selector, el) => {
  if (!el) el = document;

  if (selector instanceof HTMLElement || selector instanceof SVGElement) {
    el = selector;
  } else {
    el = el.querySelector(selector);
  }
  if (el === null) {
    return el;
  }

  let rect = null;

  el.rect = (rectString) => {
    if (!rect) rect = el.getBoundingClientRect();
    return rect[rectString];
  };

  return el;
};

export const $$ = (selector, el) => {
  if (!el) el = document;
  return Array.from(el.querySelectorAll(selector)).map((el) => $(el));
};

export const randomId = () => {
  const LENGTH = 4;
  const SOURCE = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < LENGTH; i++) {
    result += SOURCE[Math.floor(Math.random() * SOURCE.length)];
  }

  return result;
};

export const spOnly = window.matchMedia("(max-width: 767px)").matches;

export const scaleClip = (num) => {
  // const scale = num - 1;
  // const clip = (100 * scale) / 2;

  // return `inset(${clip}%)`;

  // numの値が1の時は0%、1.1の時は4.5%、2の時は25%、3の時は33.3％、4の時は37.5になる式
  return `inset(${((num - 1) * 100) / (num * 2)}%)`;
};

export class oneLineSplit {
  constructor(obj) {
    this.obj = obj;
    this.init();

    const target = this.obj.target;
    let element = null;
    if (typeof target === "object") {
      element = target;
    } else if (typeof target === "string") {
      element = document.querySelector(target);
    }

    this.lines = element.querySelectorAll(".split-text");
  }
  init() {
    const target = this.obj.target;
    const className = this.obj.className || "split-text";

    let element = null;
    if (typeof target === "object") {
      element = target;
    } else if (typeof target === "string") {
      element = document.querySelector(target);
    }

    if (element === null) return;
    this.obj.element = element;
    this.obj.old = element.innerHTML;

    this.obj.element
      .querySelectorAll(`br[${window.innerWidth < 750 ? "pc-only" : "sp-only"}]`)
      .forEach((item) => {
        item.remove();
      });

    element.style.visibility = "hidden";
    let spanWrapText = "";
    const nodes = [...element.childNodes];
    nodes.forEach((node) => {
      if (node.nodeType === 3) {
        const text = node.textContent.replace(/\r?\n/g, "\n");
        spanWrapText =
          spanWrapText +
          text.split("").reduce((acc, v) => {
            return acc + `<span>${v}</span>`;
          }, "");
      } else if (node.nodeType === 1) {
        const tag = node.tagName.toLowerCase();
        if (tag !== "br") {
          const attributes = node.attributes;
          let attr = "";
          for (let i = 0; i < attributes.length; i++) {
            attr += `${attributes[i].name}="${attributes[i].value}" `;
          }
          spanWrapText = spanWrapText + `<${tag} ${attr} char-ignore>${node.innerHTML}</${tag}>`;
        } else {
          spanWrapText = spanWrapText + `<br>`;
        }
      }
    });
    element.innerHTML = spanWrapText;

    const spanEls = [...element.childNodes].filter((node) => {
      return node.nodeType === 1 && node.tagName.toLowerCase() !== "br";
    });
    let tagList = [];
    spanEls.forEach((el) => {
      const top = Math.round(el.getBoundingClientRect().top);
      el.setAttribute("char-pos", top);
      tagList.push(top);
    });

    tagList = tagList.filter(function (x, i, self) {
      return self.indexOf(x) === i;
    });

    const textArray = [];
    tagList.forEach((item) => {
      const classNameArray = document.querySelectorAll(`[char-pos="${item}"]`);
      let text = "";
      classNameArray.forEach((el) => {
        text += el.outerHTML;
      });
      textArray.push(text);
    });
    let newSpanEl = "";
    textArray.forEach((text) => {
      if (text === "") return;
      newSpanEl += `<span class="${className}">${text}</span><br>`;
    });

    element.innerHTML = newSpanEl;

    $$(`.${className}`, element).forEach((el) => {
      const array = [...$$("*", el)];
      const text = array
        .map((char) => {
          if (char.hasAttribute("char-ignore")) {
            char.removeAttribute("char-ignore");
            char.removeAttribute("char-pos");
            return char.outerHTML;
          }
          return char.textContent;
        })
        .join("");
      // el.innerHTML = `<span>${text}</span>`;
      el.innerHTML = text;
    });
    element.style.visibility = "";
  }
  kill() {
    this.obj.element.innerHTML = this.obj.old;
  }
}

export const lowBattery = () => {
  window.lowBattery = false;
  let fps = 60;
  let lastTime = 0;
  let requestId; // 追加

  function updateFPS(currentTime) {
    if (lastTime === 0) {
      lastTime = currentTime;
      return;
    }
    const elapsed = currentTime - lastTime;
    fps = Math.round(1000 / elapsed);
    fps = Math.round(fps / 10) * 10;
    lastTime = currentTime;
  }

  function animate() {
    requestId = requestAnimationFrame(animate); // requestIdを保存する
    updateFPS(performance.now());
    if (fps <= 40 && window.innerWidth < 768) {
      document.querySelector("html").setAttribute("low-battery", "");
      window.lowBattery = true;
    } else {
      document.querySelector("html").removeAttribute("low-battery");
      window.lowBattery = false;
    }
  }

  animate();

  setTimeout(() => {
    cancelAnimationFrame(requestId); // アニメーションを停止する
  }, 5000);
};
