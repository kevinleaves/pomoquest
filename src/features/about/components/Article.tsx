import React from "react";

interface Props {
  title: string;
  content: string | string[];
}

export default function Article({ title, content }: Props) {
  const generateContent = () => {
    if (typeof content === "string") {
      return <p>{content}</p>;
    } else if (Array.isArray(content)) {
      return (
        <ul>
          {content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    }

    return null;
  };

  return (
    <article>
      <h3>{title}</h3>
      {generateContent()}
    </article>
  );
}
