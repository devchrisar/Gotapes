import React from "react";
export function replaceURLWithHTMLLinks(text) {
  const exp =
    /(\b(?:https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]|\b(?:www\.)[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

  const parts = text?.split(exp);

  return parts.map((part) => {
    if (exp.test(part)) {
      let url = part;
      if (!/^(?:https?|ftp|file):\/\//i.test(part)) {
        url = `http://  ${part}`;
      }
      return React.createElement(
        "a",
        {
          key: url,
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
