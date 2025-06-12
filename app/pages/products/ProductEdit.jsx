import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getProductById, getCategories, updateProduct } from "../../services/api";
import FloatingInput from "../../components/FloatingInput";
import FloatingSelect from "../../components/FloatingSelect";
import Checkbox from "../../components/Checkbox";

const ProductEdit = () => {
  const navigate = useNavigate();
  const formRef = useRef();
  const { id } = useParams();

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    euros: "",
    centimos: "",
    price: 0,
    stock: "",
    discount_type: "",
    discount_value: "",
    category: "",
  });

  const [useDiscount, setUseDiscount] = useState(false);
  const [categories, setCategories] = useState([]);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [existingImages, setExistingImages] = useState([]); // Store only IDs
  const [newFiles, setNewFiles] = useState([]);

  useEffect(() => {
    if (!id) {
      toast.error("Produto ID está faltando.");
      navigate("/admin/products");
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        if (!response || response.error) {
          throw new Error("Produto não encontrado");
        }

        setProductData({
          name: response.name || "",
          description: response.description || "",
          euros: Math.floor(response.price) || "",
          centimos: Math.round((response.price - Math.floor(response.price)) * 100) || "",
          price: response.price || 0,
          stock: response.stock ?? "",
          category: response.category || "",
          discount_type: response.discount?.type || "",
          discount_value: response.discount?.value || "",
        });

        // Store IDs directly
        setExistingImages(response.images || []);
        setUseDiscount(Boolean(response.discount));
      } catch (error) {
        toast.error("Erro ao buscar o produto.");
        navigate("/404");
      }
    };

    fetchProduct();
  }, [id, navigate]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        const formatted = response.categories.map((cat) => ({
          value: cat._id,
          label: cat.name,
        }));
        setCategories(formatted);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const nextStep = (e) => {
    if (e) e.preventDefault();
    if (formRef.current.checkValidity()) {
      setStep((prev) => prev + 1);
    } else {
      formRef.current.reportValidity();
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleCheckboxChange = () => {
    setUseDiscount((prev) => {
      if (prev) {
        setProductData((pd) => ({
          ...pd,
          discount_type: "",
          discount_value: "",
        }));
      }
      return !prev;
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setNewFiles((prev) => [...prev, ...files]);
    e.target.value = null;
  };

  const removeExistingImageAtIndex = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewFileAtIndex = (index) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const price = (parseInt(productData.euros || "0", 10)) + (parseInt(productData.centimos || "0", 10)) / 100;

      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("description", productData.description);
      formData.append("price", price.toFixed(2));
      formData.append("stock", productData.stock || 0);
      formData.append("category", productData.category);

      if (useDiscount) {
        formData.append(
          "discount",
          JSON.stringify({
            type: productData.discount_type,
            value: productData.discount_value,
          })
        );
      }

      // Append existing image IDs (backend expects IDs)
      existingImages.forEach((imgId) => {
        formData.append("existingImages", imgId);
      });

      // Append new files
      newFiles.forEach((file) => {
        formData.append("files", file);
      });

      // Debug: Log FormData contents
      for (let [key, value] of formData.entries()) {
        console.log(key, value instanceof File ? value.name : value);
      }

      const response = await updateProduct(id, formData);
      toast.success("Product updated successfully!");
      navigate("/admin/products");
    } catch (error) {
      toast.error(error.message || "Failed to update product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <FloatingInput
              type="text"
              id="name"
              name="name"
              placeholder="Nome do Produto"
              label="Nome do Produto"
              maxLength={60}
              required
              value={productData.name}
              onChange={handleChange}
            />
            <FloatingInput
              isTextArea
              id="description"
              name="description"
              placeholder="Descrição do Produto"
              label="Descrição do Produto"
              maxLength={150}
              required
              value={productData.description}
              onChange={handleChange}
            />
            <div className="row g-2">
              <div className="col-md">
                <FloatingInput
                  type="number"
                  id="stock"
                  name="stock"
                  placeholder="Stock do Produto"
                  label="Stock do Produto"
                  required
                  value={productData.stock}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row g-2">
              <div className="col-md-3 col-6">
                <FloatingInput
                  type="text"
                  name="euros"
                  id="euros"
                  placeholder="Euros"
                  label="Euros"
                  maxLength={6}
                  required
                  value={productData.euros}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3 col-6">
                <FloatingInput
                  type="text"
                  name="centimos"
                  id="centimos"
                  placeholder="Centimos"
                  label="Centimos"
                  maxLength={2}
                  required
                  value={productData.centimos}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <FloatingSelect
                  id="category"
                  label="Categoria"
                  name="category"
                  value={productData.category}
                  options={categories}
                  placeholder="Categoria"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row g-2">
              <div className="col-md-3 col-sm-12 col-lg-2">
                <Checkbox
                  checked={useDiscount}
                  id="isDiscounted"
                  label="Produto com Desconto?"
                  onChange={handleCheckboxChange}
                />
              </div>
              <div className="col-md">
                <FloatingSelect
                  id="discount_type"
                  label="Tipo de Desconto"
                  name="discount_type"
                  options={[
                    { value: "percentage", label: "Percentagem" },
                    { value: "fixed", label: "Valor Fixo" },
                  ]}
                  value={productData.discount_type}
                  onChange={handleChange}
                  disabled={!useDiscount}
                  required={useDiscount}
                  placeholder="Tipo de Desconto"
                />
              </div>
              <div className="col-md">
                <FloatingInput
                  type="text"
                  id="discount_value"
                  name="discount_value"
                  placeholder="Valor do Desconto"
                  label="Valor do Desconto"
                  disabled={!useDiscount}
                  required={useDiscount}
                  maxLength={6}
                  value={productData.discount_value}
                  onChange={handleChange}
                />
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="mb-3">
              <input
                type="file"
                multiple
                accept="image/*"
                className="form-control mb-3"
                onChange={handleImageUpload}
              />
            </div>
            <div className="row">
              {existingImages.map((imgId, index) => (
                <div
                  key={`existing-${index}`}
                  className="col-6 col-md-4 mb-3 position-relative"
                >
                  <img
                    src={`${imgId}`}
                    alt={`Produto existente ${index + 1}`}
                    className="img-fluid rounded"
                    style={{ maxHeight: "200px", objectFit: "cover" }}
                  />
                  <button
                    type="button"
                    className="btn btn-danger btn-sm position-absolute top-0 end-0"
                    style={{ zIndex: 10 }}
                    onClick={() => removeExistingImageAtIndex(index)}
                    aria-label={`Remover imagem existente ${index + 1}`}
                  >
                    &times;
                  </button>
                </div>
              ))}
              {newFiles.map((file, index) => (
                <div
                  key={`new-${index}`}
                  className="col-6 col-md-4 mb-3 position-relative"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Produto novo ${index + 1}`}
                    className="img-fluid rounded"
                    style={{ maxHeight: "200px", objectFit: "cover" }}
                  />
                  <button
                    type="button"
                    className="btn btn-danger btn-sm position-absolute top-0 end-0"
                    style={{ zIndex: 10 }}
                    onClick={() => removeNewFileAtIndex(index)}
                    aria-label={`Remover nova imagem ${index + 1}`}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <main>
      <section className="container py-4">
        <p className="h1">Editar Produto - {productData.name}</p>
        <div className="row">
          <div className="col">
            <div className="card bg-body-tertiary">
              <div className="card-header">
                <h5 className="card-title mb-1">
                  {step === 1 && "Informações Básicas"}
                  {step === 2 && "Imagens"}
                </h5>
              </div>
              <div className="card-body">
                <form ref={formRef} onSubmit={handleSubmit}>
                  {renderStep()}
                  <div className="d-flex justify-content-between mt-0">
                    {step > 1 && (
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={prevStep}
                      >
                        Anterior
                      </button>
                    )}
                    {step < 2 ? (
                      <button
                        type="button"
                        className="btn btn-primary ms-auto"
                        onClick={nextStep}
                      >
                        Seguinte
                      </button>
                    ) : (
                      <button 
                        type="submit" 
                        className="btn btn-primary ms-auto"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Editando...' : 'Editar Produto'}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductEdit;