const BASE_URL = "http://localhost:3000/api";

export const getProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`, {
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
      "Authorization": `Bearer ${localStorage.getItem("token")}`
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
      "Authorization": `Bearer ${localStorage.getItem("token")}`
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
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
  });
  return response.json();
};

export const getCategories = async () => {
  const response = await fetch(`${BASE_URL}/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}
