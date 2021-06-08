import "./ArticlesPopular.css";
import { useSelector } from "react-redux";
import MainTitle from "../../common/MainTitle";

import ArticleItem from "../ArticleItem";

export default function ArticlesPopular() {
  const posts = useSelector((state) => state.Post.articlesPopular);

  return (
    <>
      <MainTitle>Popular Articles</MainTitle>
      <div className="col-md-8 col-sm-12 mar-bottom-30">
        <ArticleItem isStyleRow post={posts[0]} isShowCategories />
      </div>
      <div className="col-md-4 col-sm-12 mar-bottom-30">
        <ArticleItem isStyleCard post={posts[1]} isShowCategoriesImg />
      </div>
      <div className="col-md-4 col-sm-12 mar-bottom-30">
        <ArticleItem isStyleCard post={posts[2]} isShowCategoriesImg />
      </div>
      <div className="col-md-8 col-sm-12 mar-bottom-30">
        <ArticleItem isStyleRow post={posts[1]} isShowCategories />
      </div>
    </>
  );
}
