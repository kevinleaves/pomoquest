import React from "react";
import Article from "./Article";
import { articlesData } from "../data/articlesData";

export default function About() {
  return (
    <section>
      <h2>An gamified pomodoro timer to help you be more productive</h2>
      {articlesData.map((article, index) => (
        <Article key={index} title={article.title} content={article.content} />
      ))}
    </section>
  );
}
