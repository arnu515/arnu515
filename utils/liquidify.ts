import { Liquid } from "liquidjs";
import tag from "html-tag";

const liquid = new Liquid();

liquid.registerTag("glitch", {
  parse(token) {
    this.id = token.args.trim();
  },
  render() {
    return tag(
      "div",
      { style: "height: 420px; width: 100%;" },
      tag("iframe", { src: `https://glitch.com/embed/#!/embed/${this.id}` })
    );
  }
});

liquid.registerTag("gist", {
  parse(token) {
    this.id = token.args.trim();
  },
  render() {
    return tag("script", { src: this.id + ".js" });
  }
});

liquid.registerTag("vimeo", {
  parse(token) {
    this.id = token.args.trim();
  },
  render() {
    return tag("iframe", {
      width: "1280",
      height: "720",
      src: "https://player.vimeo.com/video/" + this.id,
      frameborder: "0",
      allow: "autoplay; encrypted-media",
      allowfullscreen: true
    });
  }
});

liquid.registerTag("youtube", {
  parse(token) {
    this.id = token.args.trim();
  },
  render() {
    return tag("iframe", {
      width: "1280",
      height: "720",
      src: "https://www.youtube-nocookie.com/embed/" + this.id,
      frameborder: "0",
      allow: "autoplay; encrypted-media",
      allowfullscreen: true
    });
  }
});

liquid.registerTag("asciinema", {
  parse(token) {
    this.id = token.args.trim();
  },
  render() {
    return tag("script", {
      src: `https://asciinema.org/a/${this.id}.js`,
      id: "asciicast-" + this.id,
      async: true
    });
  }
});

export default liquid;
