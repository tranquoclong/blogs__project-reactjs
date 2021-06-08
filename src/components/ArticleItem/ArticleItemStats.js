export default function ArticleItemStats({
    viewCount
}) {
    return (
        <ul className="article-item__stats">
            <li>
                <i className="icons ion-ios-eye"></i>
                <span className="text">{viewCount}</span>
            </li>
        </ul>
    )
}

// [9, 10] -> id của categories

// Truy cập lên Server Gọi API lấy danh sách categories về

/*
[
    {
        id: 20,
        ....
    },
    {
        id: 10,
        ....
    }
]
*/