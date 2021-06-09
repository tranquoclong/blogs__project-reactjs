import ArticleItem from "../ArticleItem";
import Button from "../../common/Button";
import { actFetchPostsAsync } from "../../store/post/actions";
import { usePaging } from "../../hooks/usePaging";
import MainTitle from "../../common/MainTitle";

export default function ArticlesList() {
  const {
    loading,
    items: posts,
    handleLoadMore,
    hasMoreItems,
  } = usePaging({
    funcSelector: (state) => state.Post.articlesPaging,
    actionAsync: actFetchPostsAsync,
  });
  return (
    <>
      <MainTitle>Articles List</MainTitle>
      {posts.map((post) => {
        return (
          <div className="col-md-6 col-sm-12 mar-bottom-30" key={post.id}>
            <ArticleItem post={post} isStyleRow isShowCategories />
          </div>
        );
      })}
      {hasMoreItems && (
        <>
          <div className="col-xs-12">
            <div className="blog-button text-center">
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
        </>
      )}
    </>
  );
}
