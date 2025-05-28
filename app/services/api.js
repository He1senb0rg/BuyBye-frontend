const BASE_URL = "http://localhost:3000/api";

// User Authentication
export const userLogin = async (credentials) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

export const userRegister = async (user) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

//Products

export const getProducts = async (page, limit, sort, search) => {
  const response = await fetch(`${BASE_URL}/products?page=${page || 1}&limit=${limit || 10}&sort=${sort || "mais_recente"}&search=${search || ""}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const getProductById = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const getProductReviewsStats = async (id) => {
  const response = await fetch(`${BASE_URL}/reviews/product/${id}/stats`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const createProduct = async (product) => {
  const response = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(product),
  });
  return response.json();
};

export const updateProduct = async (id, product) => {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(product),
  });
  return response.json();
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
};

// Wishlist
export const addToWishlist = async (productId) => {
  console.log("Sending addToWishlist request with:", productId);
  console.log("Token being sent:", localStorage.getItem("token"));

  const response = await fetch(`${BASE_URL}/wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ productId }),
  });

  console.log("Raw response:", response);

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Failed response data:", errorData);
    throw new Error(`Failed to add to wishlist: ${JSON.stringify(errorData)}`);
  }

  return response.json();
};

export const removeFromWishlist = async (productId) => {
  const response = await fetch(`${BASE_URL}/wishlist`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ productId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to remove from wishlist: ${JSON.stringify(errorData)}`);
  }

  return response.json();
};

export const getWishlist = async () => {
  const response = await fetch(`${BASE_URL}/wishlist`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch wishlist: ${errorText}`);
  }

  return response.json();
};


// Category
export const getCategories = async (page, limit, sort, search) => {
  const response = await fetch(`${BASE_URL}/categories?page=${page || 1}&limit=${limit || 10}&sort=${sort || "mais_recente"}&search=${search || ""}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const getCategoryById = async (id) => {
  const response = await fetch(`${BASE_URL}/categories/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const createCategory = async (category) => {
  const response = await fetch(`${BASE_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(category),
  });
  return response.json();
};

export const updateCategory = async (id, category) => {
  const response = await fetch(`${BASE_URL}/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(category),
  });
  return response.json();
};

export const deleteCategory = async (id) => {
  const response = await fetch(`${BASE_URL}/categories/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
};

// Review
export const createReview = async (review) => {
  const response = await fetch(`${BASE_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(review),
  });
  return response.json();
};



export const deleteReview = async (id) => {
  const response = await fetch(`${BASE_URL}/reviews/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
};

// Cart
export const getCart = async () => {
  const response = await fetch(`${BASE_URL}/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
};

export const addToCart = async (item) => {
  const response = await fetch(`${BASE_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(item),
  });
  return response.json();
};

export const removeFromCart = async (productId) => {
  const response = await fetch(`${BASE_URL}/cart/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
};

export const updateCartItem = async (productId, updatedData) => {
  const response = await fetch(`${BASE_URL}/cart/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(updatedData),
  });
  return response.json();
};

//Product Management

export const editProduct = async (updatedData) => {
  const response = await fetch(`${BASE_URL}/products/${updatedData._id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },

    body: JSON.stringify(orderData),
  });
  return response.json();
};

// Checkout
export const createOrder = async (orderData) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${BASE_URL}/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao criar pedido");
  }

  return response.json();
};

export const fetchBillingHistory = async () => {
  const response = await fetch(`${BASE_URL}/checkout/history`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Billing fetch failed. Server response:", errorText);
    throw new Error("Failed to fetch billing history");
  }

  return response.json();
};
