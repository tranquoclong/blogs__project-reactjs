
function PostDetailTags(props) {
  return (
    <div className="post-detail__tags">
      <h2>Thẻ:</h2>
      <ul>
        <li className="item"><a href="/" className="btn btn-default">HTML</a></li>
        <li className="item"><a href="/" className="btn btn-default">CSS3</a></li>
        <li className="item"><a href="/" className="btn btn-default">React</a></li>
        <li className="item"><a href="/" className="btn btn-default">Vue</a></li>
      </ul>
    </div>
  )
}

export default PostDetailTags;