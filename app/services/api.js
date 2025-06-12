const BASE_URL = "http://localhost:3000/api";

const getAuthHeaders = (isJson = true) => {
  const headers = {};
  const token = localStorage.getItem("token");

  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (isJson) headers["Content-Type"] = "application/json";

  return headers;
};

// --- Auth ---

export const userLogin = async (credentials) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return res.json();
};

export const userRegister = async (user) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
};

// --- Products ---

export const getProducts = async (page = 1, limit = 10, sort = "mais_recente", search = "") => {
  const res = await fetch(`${BASE_URL}/products?page=${page}&limit=${limit}&sort=${sort}&search=${encodeURIComponent(search)}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
};

export const getProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
};

export const getProductReviewsStats = async (id) => {
  const res = await fetch(`${BASE_URL}/reviews/product/${id}/stats`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
};

export const createProduct = async (formData) => {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: getAuthHeaders(false),
    body: formData,
  });
  return res.json();
};

export const updateProduct = async (id, formData) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        ...getAuthHeaders(false), // Your auth headers
        // Don't set Content-Type - let browser set it for FormData
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update product');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating product:', error);
    throw error; // Re-throw to handle in component
  }
};

export const deleteProduct = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return res.json();
};

export const getProductsSales = async (page = 1, limit = 10, sort = "mais_recente") => {
  const res = await fetch(`${BASE_URL}/products/sales?page=${page}&limit=${limit}&sort=${sort}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
};

// --- Wishlist ---

export const addToWishlist = async (productId) => {
  const res = await fetch(`${BASE_URL}/wishlist`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ productId }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw { status: res.status, message: data.message };
  }
  return res.json();
};

export const removeFromWishlist = async (productId) => {
  const res = await fetch(`${BASE_URL}/wishlist`, {
    method: "DELETE",
    headers: getAuthHeaders(),
    body: JSON.stringify({ productId }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(`Failed to remove from wishlist: ${data.message || JSON.stringify(data)}`);
  }
  return res.json();
};

export const getWishlist = async () => {
  const res = await fetch(`${BASE_URL}/wishlist`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to fetch wishlist: ${errText}`);
  }
  return res.json();
};

export const checkIfInWishlist = async (productId) => {
  try {
    const res = await fetch(`${BASE_URL}/wishlist/check/${productId}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return await res.json();
  } catch {
    return { isWishlisted: false };
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
    headers: getAuthHeaders(),
    body: JSON.stringify(category),
  });
  return response.json();
};

export const updateCategory = async (id, category) => {
  const response = await fetch(`${BASE_URL}/categories/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(category),
  });
  return response.json();
};

export const deleteCategory = async (id) => {
  const response = await fetch(`${BASE_URL}/categories/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return response.json();
};

// --- Reviews ---

export const createReview = async (review) => {
  const res = await fetch(`${BASE_URL}/reviews`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(review),
  });
  return res.json();
};

export const updateReview = async (reviewId, data) => {
  const res = await fetch(`${BASE_URL}/reviews/${reviewId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    return { error: data.message || "Unknown update error" };
  }
  return res.json();
};

export const deleteReview = async (id) => {
  const res = await fetch(`${BASE_URL}/reviews/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return res.json();
};

export const fetchUserReviews = async (userId) => {
  const res = await fetch(`${BASE_URL}/reviews/user/${userId}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    throw new Error('Failed to fetch user reviews');
  }
  return res.json();
};

// --- Cart ---

export const getCart = async () => {
  const res = await fetch(`${BASE_URL}/cart`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return res.json();
};

export const addToCart = async (item) => {
  const res = await fetch(`${BASE_URL}/cart`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(item),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Error adding to cart");
  }
  return res.json();
};

export const removeFromCart = async (productId) => {
  const res = await fetch(`${BASE_URL}/cart/${productId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return res.json();
};

export const updateCartItem = async (productId, updatedData) => {
  const res = await fetch(`${BASE_URL}/cart/${productId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(updatedData),
  });
  return res.json();
};

// Checkout
export const createOrder = async (orderData) => {
  const response = await fetch(`${BASE_URL}/checkout`, {
    method: "POST",
    headers: getAuthHeaders(),
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
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    let errorMessage = "Erro desconhecido ao buscar histórico de faturação";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      const errorText = await response.text();
      if (errorText) errorMessage = errorText;
    }

    console.error("Billing fetch failed. Server response:", errorMessage);
    throw new Error(errorMessage);
  }

  return response.json();
};

// --- User Management ---

export const getUsers = async (page = 1, limit = 10, sort = "mais_recente", search = "") => {
  const res = await fetch(`${BASE_URL}/users?page=${page}&limit=${limit}&sort=${sort}&search=${encodeURIComponent(search)}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return res.json();
};

export const getUser = async (id) => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return res.json();
};

export const updateUser = async (id, user, file) => {
  const formData = new FormData();
  formData.append('name', user.name);
  formData.append('email', user.email);
  formData.append('role', user.role);
  if (file) formData.append('file', file);

  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(false), // no content-type for FormData
    body: formData,
  });
  return res.json();
};

export const deleteUser = async (id) => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return res.json();
};

export const removeImage = async (id) => {
  const res = await fetch(`${BASE_URL}/users/${id}/image`, {
    method: "PUT",
    headers: getAuthHeaders(),
  });
  return res.json();
};

export const changePassword = async (id, currentPassword, newPassword) => {
  const res = await fetch(`${BASE_URL}/users/${id}/password`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  return res.json();
};

// Dashboard
export const getDashboardSummary = async () => {
  const response = await fetch(`${BASE_URL}/dashboard/summary`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return response.json();
};

export const createShop = async (shop) => {
  const response = await fetch(`${BASE_URL}/shop`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(shop),
  });
  return response.json();
};

export const getShops = async (page, limit, sort, search) => {
  const response = await fetch(`${BASE_URL}/shop?page=${page || 1}&limit=${limit || 10}&sort=${sort || "mais_recente"}&search=${search || ""}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const editShop = async (shop, id, file) => {
  const formData = new FormData();
  formData.append('name', shop.name);
  formData.append('description', shop.description);

  if (file) {
    formData.append('file', file);
  }

  const response = await fetch(`${BASE_URL}/shop/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(false),
    body: formData,
  });
  return response.json();
};

export const getShopByID = async (id) => {
  const response = await fetch(`${BASE_URL}/shop/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  });
  return response.json();
};

export const deleteShop = async (id) => {
  const response = await fetch(`${BASE_URL}/shop/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return response.json();
};

export const editShopBanner = async (id, bannerFile) => {
  const formData = new FormData();
  formData.append('file', bannerFile);

  const response = await fetch(`${BASE_URL}/shop/${id}/banner`, {
    method: "PUT",
    headers: getAuthHeaders(false),
    body: formData,
  });
  return response.json();
};
