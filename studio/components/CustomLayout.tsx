import React, {useEffect} from "react";

export default function CustomLayout(props: any) {
  // Inject favicon and touch icon links into <head> at runtime.
  useEffect(() => {
    const links: Array<{rel: string; href: string; type?: string}> = [
      { rel: "icon", href: "/static/self_icon.png", type: "image/png" },
      { rel: "shortcut icon", href: "/static/self_icon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/static/self_icon.png" },
    ];

    const created: HTMLLinkElement[] = [];

    for (const { rel, href, type } of links) {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement("link");
        el.rel = rel;
        if (type) el.type = type;
        el.href = href;
        document.head.appendChild(el);
        created.push(el);
      } else {
        el.href = href;
        if (type) el.type = type;
      }
    }

    return () => {
      // Clean up only the elements we created, leave any existing site links intact
      for (const el of created) {
        el.parentNode?.removeChild(el);
      }
    };
  }, []);

  return props.renderDefault(props);
}