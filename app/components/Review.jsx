import React from 'react';
import StarRating from './StarRating';

const Review = ({ user, comment, rating, createdAt }) => {
    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(date).toLocaleDateString('pt-PT', options);
    };
    
    return (
        <div className="row pt-4">
            <div className="col">
                <div className="card p-3">
                    <div className="mb-2 fs-4">
                        <StarRating rating={rating} />
                    </div>
                    <p className="fw-bold">
                        {comment}
                    </p>
                    <p className="text-muted">{formatDate(createdAt)}</p>
                    <div className="d-flex align-items-center">
                        <i className="bi bi-person-circle fs-2"></i>
                        <p className="ps-2 mt-3">{user}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Review;