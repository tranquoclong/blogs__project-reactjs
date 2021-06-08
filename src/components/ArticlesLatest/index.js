import ArticleItemSekelton from "../ArticleItem/ArticleItemSekelton";
import { useSelector } from "react-redux";
import ArticleItemHed from "../ArticleItem/ArticleItemHed";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function ArticlesLatest() {
  const posts = useSelector((state) => state.Post.articlesLatest);
  const loadingLatestStatus = useSelector(
    (state) => state.Post.loadingLatestStatus
  );
  const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="slick__next" onClick={onClick}>
        <img
          style={{ width: "50px" }}
          src="/images/arrow.png"
          alt="Go to homepage"
        />
      </div>
    );
  };
  const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="slick__prev" onClick={onClick}>
        <img
          style={{ width: "50px" }}
          src="/images/prev.png"
          alt="Go to homepage"
        />
      </div>
    );
  };
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: true,
    autoplaySpeed: 2500,
  };
  return (
    <Slider {...settings}>
      {loadingLatestStatus === "loading" &&
        [1, 2, 3].map((index) => {
          return (
            <div className="latest-news__card" key={index}>
              <ArticleItemSekelton />
            </div>
          );
        })}
      {loadingLatestStatus === "success" &&
        posts.map((post) => {
          return <ArticleItemHed post={post} />;
        })}
    </Slider>
  );
}
