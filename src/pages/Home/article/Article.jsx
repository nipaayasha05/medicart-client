import React, { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";

const Article = () => {
  const [article, setArticle] = useState([]);

  useEffect(() => {
    fetch("/article.json")
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
      });
  }, []);

  return (
    <div>
      <p className="text-3xl text-sky-600 font-bold text-center py-5">
        Health Tips & Wellness Articles
      </p>
      <div className="container mx-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  py-3">
        {article.map((art) => (
          <ArticleCard art={art} key={art._id} />
        ))}
      </div>
    </div>
  );
};

export default Article;
