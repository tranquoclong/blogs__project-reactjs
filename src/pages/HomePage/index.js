import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticlesLatest from "../../components/ArticlesLatest";
import ArticlesPopular from "../../components/ArticlesPopular";
import ArticlesList from "../../components/ArticlesList";
import {
  actFetchLatestPostsAsync,
  actFetchPopularPostsAsync,
  actFetchPostsAsync,
} from "../../store/post/actions";
import Instagram from "../../components/Instagram";

export default function HomePage() {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.App.lang);

  useEffect(() => {
    dispatch(actFetchLatestPostsAsync());
    dispatch(actFetchPopularPostsAsync());
    dispatch(actFetchPostsAsync());
  }, [lang]);

  return (
    <main className="home-default">
      {/** Blog**/}
      <ArticlesLatest />
      <section id="mt_blog" className="light-bg">
        <div className="container">
          <div className="blog_post_sec blog_post_inner">
            <div className="row">
              <ArticlesPopular />
              <ArticlesList />
            </div>
          </div>
        </div>
      </section>
      {/** End Blog**/}
      <Instagram />
    </main>
  );
}

// best of thả thính
// searchStr = 'best'
// Input: xuLyString('best of thả thính', 'best')
// Output: <span className="highlight">best</span> of thả thính

// Dùng html...... -> show html str <span className="highlight">best</span> of thả thính
// dangerouslySetInnerHTML={{ __html: '<span className="highlight">best</span> of thả thính' }}
