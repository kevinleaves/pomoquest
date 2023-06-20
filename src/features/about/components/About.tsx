import React from "react";
import Article from "./Article";
import { articlesData } from "../data/articlesData";

export default function About() {
  return (
    <div className="flex h-full w-full flex-col items-center bg-[#F8F8F8] py-12 font-publicSans  text-[#222222]">
      <section className="w-5/6 md:w-3/6">
        <h2 className="mb-8 text-4xl font-bold">
          An gamified pomodoro timer to help you be more productive
        </h2>
        <div className="flex flex-col flex-wrap gap-8">
          {articlesData.map((article, index) => (
            <Article
              key={index}
              title={article.title}
              content={article.content}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
