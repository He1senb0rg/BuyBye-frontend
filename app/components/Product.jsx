import React from 'react';

const Product = ({ name, description, price, discountPrice, discount, image, rating, link }) => {
	const renderStars = (rating) => {
		const fullStars = Math.floor(rating);
		const halfStar = rating % 1 >= 0.5;
		const stars = [];

		for (let i = 0; i < fullStars; i++) {
			stars.push(<i key={`full-${i}`} className="bi bi-star-fill text-warning" />);
		}

		if (halfStar) {
			stars.push(<i key="half" className="bi bi-star-half text-warning" />);
		}

		while (stars.length < 5) {
			stars.push(<i key={`empty-${stars.length}`} className="bi bi-star text-warning" />);
		}

		return stars;
	};

	return (
		<div className="card">
			<a
				href={link}
				className="text-decoration-none product-image rounded mx-3 mt-3"
			>
				<img
					src={image}
					className="card-img-top rounded"
					alt={name}
				/>
			</a>
			<div className="card-body">
				<div className="d-flex justify-content-between">
					<a
						href={link}
						className="text-decoration-none text-light"
					>
						<h5 className="card-title text-wrap" style={{ transition: "0.3s" }}>
							{name}
						</h5>
					</a>
					{discount ? (
						<div className="card-img-overlay" style={{ "pointer-events": "none" }}>
							<span className="badge bg-primary p-2 mt-1 ms-1 fs-5">-{discount}%</span>
						</div>
					) : null
					}
					<i className="bi bi-heart-fill text-danger" />
				</div>
				<p className="card-text">{description}</p>
				<div className="d-flex justify-content-between">
					{discountPrice ? (
						<>
							<div className="d-flex">
								<p className="h4 me-2">{discountPrice}€</p>
								<p className="text-decoration-line-through text-muted ">{price}€</p>
							</div>
						</>
					) : (
						<p className="h4">{price}€</p>
					)}
					<div>
						{renderStars(rating)}
						<small className="text-muted">({rating})</small>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Product;