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
        <ul className="list-disc">
          {content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    }

    return null;
  };

  return (
    <article className="">
      <h3 className="mb-4 text-2xl font-semibold after:absolute after:ml-6 after:mt-2 after:h-4 after:w-4 after:rounded-full after:bg-black after:px-8">
        {title}
      </h3>
      {generateContent()}
    </article>
  );
}
