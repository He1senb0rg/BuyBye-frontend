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
  const response = await fetch(`${BASE_URL}/wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ productId }),
  });

  const responseData = await response.json();
  console.log("Raw response:", response);
  console.log("Failed response data:", responseData);

  if (!response.ok) {
    throw { status: response.status, message: responseData.message };
  }

  return responseData;
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

export const checkIfInWishlist = async (productId) => {
  try {
    const response = await fetch(`${BASE_URL}/wishlist/check/${productId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error checking wishlist status:', error);
    return { isWishlisted: false };
  }
};

export const getUserReviewForProduct = async (userId, productId) => {
  try {
    const response = await fetch(`/api/reviews/${userId}/${productId}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao obter avaliação.');
    return data;
  } catch (error) {
    return { error: error.message };
  }
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

export const updateReview = async (reviewId, data) => {
  try {
    const response = await fetch(`${BASE_URL}/reviews/${reviewId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { error: errorData.message || "Erro desconhecido ao atualizar." };
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar a avaliação:", error);
    return { error: "Erro de rede" };
  }
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

  if (!response.ok) {
    // Try to parse the error message from the response
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro ao adicionar ao carrinho.");
  }

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

// User Management

export const getUsers = async (page, limit, sort, search) => {
  const response = await fetch(`${BASE_URL}/users?page=${page || 1}&limit=${limit || 10}&sort=${sort || "mais_recente"}&search=${search || ""}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
}

export const getUser = async (id) => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
};

export const updateUser = async (id, userData) => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const deleteUser = async (id) => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
};

export const removeImage = async (id) => {
  const response = await fetch(`${BASE_URL}/users/${id}/image`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    }
  });
  return response.json();
};

// Change Password
export const changePassword = async (id, currentPassword, newPassword) => {
  const response = await fetch(`${BASE_URL}/users/${id}/password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  });

  return response.json();
};