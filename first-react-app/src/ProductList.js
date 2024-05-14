import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { validateFormField, validateFullField, priceFormatter, priceParser, isExistError } from './utils'
import InputNumber from 'rc-input-number';
import './ProductList.css'
import ProductItem from './ProductItem'

const initFormData = {
  name: "",
  price: "",
  discount: "",
}
const initFormError = {
  name: "",
  price: "",
  discount: "",
}

function ProductList() {
  const refInputNameEl = useRef(null);

  // const [error, setError] = useState("");
  const [formData, setFormData] = useState(initFormData);
  const [formError, setFormError] = useState(initFormError);
  const [productList, setProductList] = useState([
    { id: 10, name: "Dien thoai Samsung", price: 100000, discount: 0 },
    { id: 11, name: "Dien thoai Oppo", price: 110000, discount: 50 },
    { id: 12, name: "Dien thoai Apple", price: 120000, discount: 20 },
  ]);

  const [productToDelete, setProductToDelete] = useState(null);
 // const [productToEdit, setProductToEdit] = useState(null);

  // onSubmit
  function handleAddNewProduct(event) {
    event.preventDefault();
    const newFormError = validateFullField(formData)

    setFormError(newFormError)

    if (isExistError(newFormError)) {
      return // Khong cho chay xuong doan code submit
    }

    setFormError(initFormError)
    setFormData(initFormData)
    setProductList([
      ...productList,
      { id: parseInt(Math.random() * 999), ...formData },
    ]);
  }
  console.log('formData', formData)
  function onChangeFormData(event, key) {
    const value = event.target.value;
    const error = validateFormField(key, value, (currentError) => {
      if (key === 'name') {
        //
      }
      return currentError
    })

    setFormData({ ...formData, [key]: value });
    setFormError({ ...formError, [key]: error })
  }

  function handleEditProduct(productToEdit) {
    // const newProductList = productList.map((p) =>
    //   p.id === productToEdit.id ? { ...p, name: productToEdit.name, price:productToEdit.price,discount:productToEdit.discount } : p
    // );
    setProductList(productList.map((p) =>
      p.id === productToEdit.id ? productToEdit : p
    ))
    //setProductList(newProductList);
 //   setProductToEdit(null);
  }
  const handleClose = () => {
    setProductToDelete(null);
  };

  function handleDelete() {
    if (!productToDelete) return;
    setProductList(productList.filter((p) => p.id !== productToDelete.id));
    handleClose();
  }

  const show = Boolean(productToDelete);

  return (
    <div className="container">
      <h1>ProductList</h1>
      <form
        className="d-flex align-items-start w-50"
        onSubmit={handleAddNewProduct}
      >
        <div>
          <input
            ref={refInputNameEl}
            type="text"
            className={
              formError.name ? "is-invalid form-control" : "form-control"
            }
            placeholder="Nhap ten san pham"
            value={formData.name}
            onChange={(event) => onChangeFormData(event, 'name')}
          />
          {formError.name && (
            <div className="invalid-feedback">{formError.name}</div>
          )}
        </div>
        <div>
          <InputNumber
            step={1}
            value={formData.price}
            onChange={(newPrice) => {
              const event = { target: { value: newPrice ?? '' } }
              console.log('onChange Input Number', newPrice)
              onChangeFormData(event, 'price')
            }}
            prefixCls="giang"
            placeholder="Nhap gia"
            className={formError.price ? 'is-invalid' : ''}
            formatter={priceFormatter}
            parser={priceParser}
          />
          {formError.price && (
            <div className="invalid-feedback">{formError.price}</div>
          )}
        </div>
        <div>
          <InputNumber
            min={0}
            max={100}
            step={1}
            value={formData.discount}
            onChange={(newDiscount) => {
              const event = { target: { value: newDiscount ?? '' } }
            //  console.log('onChange Input Discount', newDiscount)
              onChangeFormData(event, 'discount')
            }}
            prefixCls="giang"
            placeholder="Nhap gia giam"
            className={formError.discount ? 'is-invalid' : ''}
          />
          {formError.discount && (
            <div className="invalid-feedback">{formError.discount}</div>
          )}
        </div>
        <button className="btn btn-primary" style={{ whiteSpace: "nowrap" }}>
          Them Moi
        </button>
      </form>
      <div className="row mt-5">
        <div className="col-6">
          <ul className="list-group">
            {productList.map((productItem) => {
              return (
                <ProductItem
                  key={productItem.id}
                  productItem={productItem}
                  handleEditProduct={handleEditProduct}
                  setProductToDelete={setProductToDelete}
                />
              )
            })}
          </ul>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Body>
          Ban co muon xoa san pham "{productToDelete?.name}" khong?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

// https://www.npmjs.com/package/react-number-format
export default ProductList;
