import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getProductById, getCategories, updateProduct } from "../../services/api";
import FloatingInput from "../../components/FloatingInput";
import FloatingSelect from "../../components/FloatingSelect";
import Checkbox from "../../components/Checkbox";
import ProductImagesSwiper from "../../components/products/ProductImagesSwiper";

const ProductEdit = () => {
  const navigate = useNavigate();
  const formRef = useRef();
  const { id } = useParams();

  const [useDiscount, setUseDiscount] = useState(false);
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [existingImages, setExistingImages] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);

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

useEffect(() => {
  if (!id) {
    toast.error("Produto ID está faltando.");
    navigate("/admin/products");
    return;
  }

  const fetchProductAndCategories = async () => {
    try {
      setLoading(true);

      // Fetch product data
      const productResponse = await getProductById(id);
      console.log("Fetched productResponse:", productResponse); // <-- DEBUG

      if (!productResponse || productResponse.error) {
        throw new Error("Produto não encontrado");
      }

      // Fetch categories
      const categoriesResponse = await getCategories();
      const formattedCategories = categoriesResponse.categories.map((cat) => ({
        value: cat._id,
        label: cat.name,
      }));
      setCategories(formattedCategories);

      // Set product data
      const price = productResponse.price || 0;
      setProductData({
        name: productResponse.name || "",
        description: productResponse.description || "",
        euros: Math.floor(price) || "",
        centimos: Math.round((price - Math.floor(price)) * 100) || "",
        price: price,
        stock: productResponse.stock ?? "",
        category: productResponse.category || "",
        discount_type: productResponse.discount?.type || "",
        discount_value: productResponse.discount?.value || "",
      });

      // Format images & debug
      const formattedImages = productResponse.images.map((imgUrl, index) => ({
  id: index,
  url: imgUrl.startsWith('http') ? imgUrl : `/${imgUrl}`,
  filename: imgUrl.split('/').pop(),
}));

      console.log("Formatted Images:", formattedImages); // <-- DEBUG

      setExistingImages(formattedImages || []);
      setUseDiscount(Boolean(productResponse.discount));
      if (productResponse.discount) {
        setDiscountType(productResponse.discount.type);
        setDiscountValue(productResponse.discount.value);
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
      toast.error("Erro ao buscar o produto.");
      navigate("/404");
    } finally {
      setLoading(false);
    }
  };

  fetchProductAndCategories();
}, [id, navigate]);

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
    setUseDiscount(!useDiscount);
    if (!useDiscount) {
      setProductData((prevData) => ({
        ...prevData,
        discount_type: "",
        discount_value: "",
      }));
    }
  };

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setNewFiles((prev) => [...prev, ...files]);
    e.target.value = null;
  };

  const removeExistingImage = (index) => {
    if (existingImages.length + newFiles.length <= 1) {
      toast.error("Deve manter pelo menos uma imagem.");
      return;
    }
    const imageToRemove = existingImages[index];
    setImagesToDelete(prev => [...prev, imageToRemove.id]);
    setExistingImages(prev => prev.filter((_, idx) => idx !== index));
  };

  const removeNewFile = (index) => {
    if (existingImages.length + newFiles.length <= 1) {
      toast.error("Deve manter pelo menos uma imagem.");
      return;
    }
    setNewFiles(prev => prev.filter((_, idx) => idx !== index));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  if (existingImages.length + newFiles.length === 0) {
    toast.error("Adicione pelo menos uma imagem.");
    setIsSubmitting(false);
    return;
  }

  const euros = parseInt(productData.euros || "0", 10);
  const centimos = parseInt(productData.centimos || "0", 10);
  const price = euros + centimos / 100;

  const formData = new FormData();
  formData.append("name", productData.name);
  formData.append("description", productData.description);
  formData.append("price", Number(price.toFixed(2)));
  formData.append("stock", Number(productData.stock));
  formData.append("category", productData.category);

  if (useDiscount) {
    const discount = JSON.stringify({
      type: productData.discount_type,
      value: productData.discount_value,
    });
    formData.append("discount", discount);
  }

  existingImages.forEach((img) => {
    formData.append("existingImages", img.id);
  });

  imagesToDelete.forEach((imgId) => {
    formData.append("imagesToDelete", imgId);
  });

  newFiles.forEach((file) => {
    formData.append("files", file);
  });

  try {
    await updateProduct(id, formData);
    toast.success("Produto atualizado com sucesso!");
    setTimeout(() => navigate("/admin/products"), 100);
  } catch (error) {
    console.error("Erro:", error.message);
    toast.error("Erro ao atualizar o produto.");
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
              required={true}
              value={productData.name}
              onChange={handleChange}
            />
            <FloatingInput
              isTextArea={true}
              id="description"
              name="description"
              placeholder="Descrição do Produto"
              label="Descrição do Produto"
              maxLength={150}
              required={true}
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
                  required={true}
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
                  value={productData.euros}
                  maxLength={6}
                  required={true}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3 col-6">
                <FloatingInput
                  type="text"
                  name="centimos"
                  id="centimos"
                  value={productData.centimos}
                  placeholder="Centimos"
                  label="Centimos"
                  maxLength={2}
                  required={true}
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
                  required={true}
                />
              </div>
            </div>
            <div className="row g-2">
              <div className="col-md-3 col-sm-12 col-lg-2">
                <Checkbox
                  id="isDiscounted"
                  label="Produto com Desconto?"
                  checked={useDiscount}
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
                  onChange={(e) => {
                    setDiscountType(e.target.value);
                    handleChange(e);
                  }}
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
                  value={productData.discount_value}
                  maxLength={6}
                  onChange={(e) => {
                    setDiscountValue(e.target.value);
                    handleChange(e);
                  }}
                />
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="row">
              <div className="col-12 col-md-8">
                <ProductImagesSwiper 
                  imageFiles={[
                    ...existingImages.map(img => img.url),
                    ...newFiles.map(file => URL.createObjectURL(file))
                  ]} 
                />
              </div>
              <div className="col-12 col-md-4">
                <p className="h4">Imagens</p>
                <p>
                  Ficheiros suportados: JPG, PNG, GIF, WEBP <br />
                  Tamanho máximo: 150 mb
                </p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="form-control mb-3"
                />
                {(existingImages.length > 0 || newFiles.length > 0) && (
                  <ul className="list-group mb-3">
                    {existingImages.map((img, index) => (
                      <li key={`existing-${index}`} className="list-group-item d-flex justify-content-between align-items-center">
                        <span className="text-truncate" style={{ maxWidth: "150px" }} title={img.url.split("/").pop()}>
  {img.url.split("/").pop()}
</span>
                        <button 
                          type="button" 
                          className="btn btn-sm btn-danger" 
                          onClick={() => removeExistingImage(index)}
                        >
                          Remover
                        </button>
                      </li>
                    ))}
                    {newFiles.map((file, index) => (
                      <li key={`new-${index}`} className="list-group-item d-flex justify-content-between align-items-center">
                        <span className="text-truncate" style={{ maxWidth: "150px" }} title={file.name}>
                          {file.name}
                        </span>
                        <button 
                          type="button" 
                          className="btn btn-sm btn-danger" 
                          onClick={() => removeNewFile(index)}
                        >
                          Remover
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
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
        <p className="h1 mb-4">Editar Produto - {productData.name}</p>
        <div className="row">
          <div className="col">
            <div className="card bg-body-tertiary">
              <div className="card-header">
                <h5 className="card-title mb-1">
                  {step === 1 && "Informações Básicas"}
                  {step === 2 && "Imagens"}
                </h5>
              </div>
              <div className="card-body d-flex flex-column">
                <form ref={formRef} onSubmit={handleSubmit} className="d-flex flex-column">
                  <div className="flex-grow-1">{renderStep()}</div>
                  <div className="d-flex justify-content-between mt-4">
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
                        className="btn btn-primary ms-auto px-4 py-2"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Atualizando...' : 'Atualizar Produto'}
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