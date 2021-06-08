import ArticleItemInfor from "./ArticleItemInfor";
import ArticleItemTitle from "./ArticleItemTitle";
import ArticleItemDesc from "./ArticleItemDesc";
import ArticleItemCategories from "./ArticleItemCategories";
import ArticleItemStats from "./ArticleItemStats";

export default function ArticleItemHed({
  post,
  isShowDesc = false,
  isShowCategories = false,
}) {
  if (!post) {
    return null;
  }

  const title = post.title.rendered;
  const slugLink = `/post/${post.slug}`;
  const thumbnails = post.featured_media_url;

  const authorId = post.author;
  const authorName = post.author_data.nickname;
  const authorAvatar = post.author_data.avatar;
  const authorLink = `/user/${post.author}`;

  const created = post.date;

  const shortDesc = post.excerpt.rendered;
  const viewCount = post.view_count;
  const categoriesId = post.categories;

  return (
    <section id="mt_banner">
      <div className="swiper-container">
        <div
          className="slide-inner"
          style={{ backgroundImage: `url(${thumbnails})` }}
        />
        <div className="banner_caption_text">
          {isShowCategories && (
            <ArticleItemCategories categoriesId={categoriesId} />
          )}
          {isShowCategories && <ArticleItemStats viewCount={viewCount} />}
          <ArticleItemTitle title={title} slugLink={slugLink} />
          {isShowDesc && <ArticleItemDesc shortDesc={shortDesc} />}
          <ArticleItemInfor
            created={created}
            authorId={authorId}
            authorName={authorName}
            authorLink={authorLink}
            authorAvatar={authorAvatar}
          />
        </div>
      </div>
    </section>
  );
}
