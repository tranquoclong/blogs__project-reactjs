
const MAX_LENGTH_DESC = 20;

export default function ArticleItemDesc({
    shortDesc
}) {

    const cutShortDesc = shortDesc.split(' ').slice(0, MAX_LENGTH_DESC).join(' ') + '...</p>';

    // console.log(cutShortDesc);

    const innerHTML = {
        __html: cutShortDesc
    }

    return (
        <div className="article-item__desc" dangerouslySetInnerHTML={innerHTML}>
            
        </div>
    )
}