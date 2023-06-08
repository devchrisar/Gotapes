import React from "react";
export function replaceURLWithHTMLLinks(text) {
  const exp =
    /(\b(?:https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]|\b(?:www\.)[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

  const parts = text?.split(exp);

  return parts.map((part, index) => {
    if (part.match(exp)) {
      let url = part;
      if (!part.match(/^(?:https?|ftp|file):\/\//i)) {
        url = "http://" + part;
      }
      return React.createElement(
        "a",
        {
          key: index,
          href: url,
          target: "_blank",
          rel: "noopener noreferrer",
        },
        part
      );
    } else {
      return part;
    }
  });
}
