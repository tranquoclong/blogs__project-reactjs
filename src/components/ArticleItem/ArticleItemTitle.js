import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function handleHighlightSearch(originStr, searchStr) {
  return originStr;
}

export default function ArticleItemTitle({ title, slugLink }) {
  const location = useLocation();
  // Lấy location.search
  // Dùng thư viện queryString -> q = 'react'
  // Nếu có tồn tại q (Tức là component này được chạy ở trong trang search)
  // So luôn url location.path === '/search'

  if (location.pathname === "/search") {
    console.log("Component title được render ở trong trang Search");
    return (
      <h2 className="entry-title">
        <Link to={slugLink} className="white">
          {handleHighlightSearch(title, "best")}
        </Link>
      </h2>
    );
  }

  return (
    <h2 className="entry-title">
      <Link to={slugLink} className="white">
        {title}
      </Link>
    </h2>
  );
}
