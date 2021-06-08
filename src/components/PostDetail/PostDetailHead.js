import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ArticleItemCategories from "../ArticleItem/ArticleItemCategories";

function PostDetailHead({ isShowCategories = false }) {
  const post = useSelector((state) => state.Post.postDetail);

  if (!post) {
    return <div></div>;
  }
  const thumbnails = post.featured_media_url;
  const postTitle = post.title.rendered;
  const postAuthorName = post.author_data.nickname;
  const postCmtCount = post.comment_count;
  const postViewCount = post.view_count;
  const categoriesId = post.categories;
  const date = dayjs(new Date(post.date));
  const dateStr = date.format("DD/MM/YYYY");

  return (
    <div id="mt_banner" className="innerbanner">
      <div className="container-fluid">
        <div
          className="featured-image"
          style={{ backgroundImage: `url(${thumbnails})` }}
        />
        <div className="banner-caption">
          <div className="banner_caption_text">
            {isShowCategories && (
              <ArticleItemCategories categoriesId={categoriesId} />
            )}
            <h1>{postTitle}</h1>
            <div className="item-meta">
              <span style={{ paddingRight: "10px" }}>by</span>
              <a href="/">
                <strong>{postAuthorName}</strong>
              </a>
              <p>{dateStr}</p>
              <div style={{ display: "flex" }}>
                <p className="item views" style={{ paddingRight: "15px" }}>
                  {postViewCount} <i className="icons ion-ios-eye" />
                </p>
                <p className="item comments">
                  {postCmtCount} <i className="icons ion-ios-chatbubble" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetailHead;
