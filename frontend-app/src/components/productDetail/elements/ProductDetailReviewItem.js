import { Rate } from "antd";
import React from "react";
import moment from "moment";

function ProductDetailReviewItem({ review }) {
  return (
    <div className="product-detail-review-item">
      <div className="product-detail-review-item__avatar">
        <img
          src={review.avatar}
          alt="Reviewer avatar"
        />
        <br/>
        <Rate disabled defaultValue={3.5} />
      </div>
      <div className="product-detail-review-item__content">
        <h5>{moment(review?.created_at).format('DD-MM-YYYY')}</h5>
        <h3>{review?.name}</h3>
        <p>
          {review?.content}
        </p>
      </div>
    </div>
  );
}

export default React.memo(ProductDetailReviewItem);
