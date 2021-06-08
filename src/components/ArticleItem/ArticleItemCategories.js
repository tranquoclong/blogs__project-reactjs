import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ArticleItemCategories({ categoriesId }) {
  const hashCategoryFromId = useSelector(
    (state) => state.Category.hashCategoryFromId
  );

  return (
    <div className="post-category">
      <ul>
        {categoriesId.map((cateId) => {
          const data = hashCategoryFromId[cateId];

          if (!data) {
            return null;
          }

          const slugLink = `/category/${data.slug}`;
          return (
            <li className="cat-pink" key={cateId}>
              <Link to={slugLink} className="white">
                {data.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
