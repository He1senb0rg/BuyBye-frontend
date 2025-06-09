import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState, useEffect, useRef } from "react";
import { createProduct, getCategories } from "../../services/api";
import FloatingInput from "../../components/FloatingInput";
import FloatingSelect from "../../components/FloatingSelect";
import Checkbox from "../../components/Checkbox";
import ProductImagesSwiper from "../../components/products/ProductImagesSwiper";

const CreateProduct = () => {
  const navigate = useNavigate();
  const formRef = useRef();
  const [step, setStep] = useState(1);
  let imgNum = 0;

  const nextStep = (e) => {
    if (e) e.preventDefault();

    if (formRef.current.checkValidity()) {
      setStep((prev) => prev + 1);
    } else {
      formRef.current.reportValidity();
    }
  };
  const prevStep = () => setStep((prev) => prev - 1);

  const [useDiscount, setUseDiscount] = useState(false);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const [imageFiles, setImageFiles] = useState([]);

  const handleCheckboxChange = () => {
    setUseDiscount(!useDiscount);
  };

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
    images: [],
  });

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const euros = parseInt(productData.euros || "0", 10);
    const centimos = parseInt(productData.centimos || "0", 10);
    const price = euros + centimos / 100;

    const finalProductData = {
      ...productData,
      price: Number(price.toFixed(2)),
      stock: Number(productData.stock),
    };

    try {
      const response = await createProduct(finalProductData);

      toast.success("Produto criado com sucesso!");
      setTimeout(() => navigate("/admin/products"), 100);
    } catch (error) {
      console.error("Erro:", error.message);
      toast.error("Erro ao criar o produto.");
    }
  };

  const addImage = () => {
    const newImage = `https://picsum.photos/seed/${
      productData.name + imgNum
    }/800/900`;
    setImageFiles((prev) => {
      const updated = [...prev, newImage];
      setProductData((prevData) => ({ ...prevData, images: updated }));
      return updated;
    });
    imgNum++;
  };

  const removeImage = () => {
    setImageFiles((prev) => {
      const updated = prev.slice(0, -1);
      setProductData((prevData) => ({ ...prevData, images: updated }));
      return updated;
    });
    if (imgNum > 0) imgNum--;
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

              <div className="col-md">
                <label className="form-label my-0" htmlFor="imageInput">
                  Imagem do Produto
                </label>
                <input
                  type="file"
                  name="image"
                  className="form-control mb-3"
                  id="imageInput"
                  placeholder="Imagem do Produto"
                  accept="image/*"
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
                <ProductImagesSwiper imageFiles={imageFiles} />
              </div>
              <div className="col-12 col-md-4">
                <p className="h4">Imagens</p>
                <p>
                  Ficheiros suportados: JPG, PNG, GIF, WEBP <br />
                  Tamanho máximo: 150 mb
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={addImage}
                >
                  Adicionar Imagem
                </button>
                <button
                  type="button"
                  className="btn btn-danger ms-3"
                  onClick={removeImage}
                >
                  Remover Imagem
                </button>
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
        <p className="h1">Criar Novo Produto</p>
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
                      <button type="submit" className="btn btn-primary ms-auto">
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
