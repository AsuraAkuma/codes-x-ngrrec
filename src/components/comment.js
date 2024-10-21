import React from "react";
import './css/comment.css';
import '../css/base.css';
// %PUBLIC_URL%
const ProductComment = ({ author, timestamp, content }) => {
    // logic
    const commentId = `${author}-${timestamp}`;
    const time = new Date(timestamp);
    // return html element
    return (
        <div className="comment" id={commentId}>
            <p className="comment-header">{author}<span>{time.toLocaleString()}</span></p>
            <p className="comment-content">{content}</p>
        </div>
    )
};

export default ProductComment;