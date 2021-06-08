import MainTitle from "../../common/MainTitle";
import Button from "../../common/Button";
import ArticleItem from "../../components/ArticleItem";
import queryString from "query-string";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { actFetchPostsSearchAsync } from "../../store/post/actions";
import { usePaging } from "../../hooks/usePaging";
import Instagram from "../../components/Instagram";

function SearchPage() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const obj = queryString.parse(location.search); // {}
  const searchStr = obj.q; // undefined

  useEffect(() => {
    dispatch(
      actFetchPostsSearchAsync({
        page: 1,
        search: searchStr,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchStr]);

  const {
    items: posts,
    loading,
    totalElement,
    handleLoadMore,
    hasMoreItems,
  } = usePaging({
    funcSelector: (state) => state.Post.articlesSearchPaging,
    actionAsync: actFetchPostsSearchAsync,
    extraParams: {
      search: searchStr,
    },
  });

  if (!searchStr) {
    history.push("/");
  }

  return (
    <main className="home-1">
      {/* Breadcrumb */}
      <section className="breadcrumb-outer text-center bg-red">
        <div className="container">
          <div className="breadcrumb-content">
            <h2>Lifestyle</h2>
            <nav aria-label="breadcrumb">
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="/">CategoryPage</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
      {/* BreadCrumb Ends */}

      {/** Blog**/}
      <section id="mt_blog" className="nomargin">
        <div className="container">
          <div className="row">
            <MainTitle isSearch>
              {totalElement} Kết quả tìm kiếm cho từ khoá "{searchStr}"
            </MainTitle>
            {posts.map((post) => {
              return (
                <div className="col-md-12 width100" key={post.id}>
                  <ArticleItem isShowCategories post={post} />
                </div>
              );
            })}
            {hasMoreItems && (
              <div class="col-xs-12">
                <div class="blog-button text-center">
                  <Button
                    className="btn-blog"
                    type="primary"
                    isSizeLarge
                    isLoading={loading}
                    onClick={handleLoadMore}
                  >
                    Tải thêm
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      {/** End Blog**/}
      <Instagram />
    </main>
  );
}

export default SearchPage;
