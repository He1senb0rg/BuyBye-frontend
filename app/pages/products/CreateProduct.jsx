import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createProduct, getCategories } from "../../services/api";
import FloatingInput from "../../components/FloatingInput";
import FloatingSelect from "../../components/FloatingSelect";
import Checkbox from "../../components/Checkbox";
import ProductImagesSwiper from "../../components/products/ProductImagesSwiper";

const CreateProduct = () => {
  const navigate = useNavigate();
  const formRef = useRef();
  const [step, setStep] = useState(1);

  const [useDiscount, setUseDiscount] = useState(false);
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState("");

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [imageFiles, setImageFiles] = useState([]);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    euros: "",
    centimos: "",
    price: "",
    stock: "",
    discount_type: "",
    discount_value: "",
    category: "",
  });

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
        setError("Erro ao carregar categorias.");
      } finally {
        setLoading(false);
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
    setUseDiscount(!useDiscount);
    if (useDiscount) {
      setDiscountType("percentage");
      setDiscountValue("");
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

  const handleImageChange = (e) => {
    setImageFiles([...imageFiles, ...e.target.files]);
  };

 const removeImage = (index) => {
  if (imageFiles.length <= 1) {
    toast.error("Deve manter pelo menos uma imagem.");
    return;
  }

  setImageFiles((prev) => prev.filter((_, idx) => idx !== index));
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (imageFiles.length === 0) {
    toast.error("Adicione pelo menos uma imagem.");
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
    formData.append("discount_type", discountType);
    formData.append("discount_value", discountValue);
  }

  imageFiles.forEach((file) => {
    formData.append("files", file);
  });

  try {
    await createProduct(formData);
    toast.success("Produto criado com sucesso!");
    setTimeout(() => navigate("/admin/products"), 100);
  } catch (error) {
    console.error("Erro:", error.message);
    toast.error("Erro ao criar o produto.");
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
                <ProductImagesSwiper imageFiles={imageFiles.map(file => URL.createObjectURL(file))} />
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
                  onChange={handleImageChange}
                  className="form-control mb-3"
                />
                {imageFiles.length > 0 && (
                  <ul className="list-group mb-3">
                    {imageFiles.map((file, index) => (
                      <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
  <span className="text-truncate" style={{ maxWidth: "150px" }} title={file.name}>
    {file.name}
  </span>
  <button type="button" className="btn btn-sm btn-danger" onClick={() => removeImage(index)}>
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
        <p className="h1 mb-4">Criar Novo Produto</p>
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
                      <button type="submit" className="btn btn-primary ms-auto px-4 py-2">
                        Criar Produto
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

export default CreateProduct;