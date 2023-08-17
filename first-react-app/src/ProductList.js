import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { validateFormData, transformFormValue } from './utils'
import InputNumber from 'rc-input-number';
import './ProductList.css'

function ProductList() {
  const refInputNameEl = useRef(null);

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discount: "",
  });
  const [formError, setFormError] = useState({
    name: "",
    price: "",
    discount: "",
  });
  const [productList, setProductList] = useState([
    { id: 10, name: "Dien thoai Samsung", price: 100000, discount: 0 },
    { id: 11, name: "Dien thoai Oppo", price: 110000, discount: 50 },
    { id: 12, name: "Dien thoai Apple", price: 120000, discount: 20 },
  ]);

  const [productToDelete, setProductToDelete] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);

  function handleAddNewProduct(event) {
    event.preventDefault();

    // if (!productName.trim()) {
    //   setError("Ten khong hop le. Vui long nhap lai!");
    //   refInputNameEl.current.focus();
    //   return;
    // }

    setError("");
    //  setProductName("");
    // setProductList([
    //   ...productList,
    //   { id: parseInt(Math.random() * 999), name: productName.trim() },
    // ]);
  }

  function onChangeFormData(event, key) {
    const inputValue = event.target.value;

    const error = validateFormData(key, inputValue)
    const value = transformFormValue(key, inputValue, error)

    setFormData({ ...formData, [key]: value });
    setFormError({ ...formError, [key]: error })
  }
  console.log('formData', formData)
  // console.log('formError', formError)
  function handleEditName(event) {
    setProductToEdit({ ...productToEdit, name: event.target.value });
  }
  function handleEditProduct(event) {
    event.preventDefault();
    const newProductList = productList.map((p) =>
      p.id === productToEdit.id ? { ...p, name: productToEdit.name } : p
    );

    setProductList(newProductList);
    setProductToEdit(null);
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
            min={0}
            step={1}
            // defaultValue={3123124.934}
            value={formData.price}
            onChange={(newPrice) => {
              const event = { target: { value: newPrice || '' } }
              console.log('onChange Input Number', newPrice)
              onChangeFormData(event, 'price')
            }}
            onInput={(inputPrice) => {
              console.log('inputPrice', inputPrice)
            }}
            prefixCls="giang"
            placeholder="Nhap gia"
            formatter={((value, {userTyping, input}) => {
              if (userTyping) {
                console.log('input', input)
                return input;
              }

              const formattedValue = String(value).replace('.',',').split(',').map((num, idx) => {
                if (idx === 0) {
                  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num).replace(' ₫', '')
                }
            
                return num
              }).join(',')
              console.log('formattedValue', formattedValue)
              return formattedValue
            })}
            // formatter={(value, { userTyping, input }) => {
            //   if (userTyping) {
            //     return input;
            //   }
            //   return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
            // }}
            pattern="\d*"
            parser={formattedValue => {
              // 3.123.124,934
              // replaceAll '.' -> '' 3123124,934
              // replace ',' -> '.' 3123124.934
              return formattedValue.replace(/\./g, '').replace(',', '.')
            }}
            inputMode="numeric"
          />
          {/* <input
            type="text"
            className={
              formError.price ? "is-invalid form-control" : "form-control"
            }
            placeholder="Nhap gia"
            value={formData.price}
            onChange={(event) => onChangeFormData(event, 'price')}
          /> */}
          {formError.price && (
            <div className="invalid-feedback">{formError.price}</div>
          )}
        </div>
        <div>
          <input
            type="text"
            className={
              formError.discount ? "is-invalid form-control" : "form-control"
            }
            placeholder="Nhap Giam gia"
            value={formData.discount}
            onChange={(event) => onChangeFormData(event, 'discount')}
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
                <li
                  className="d-flex justify-content-between list-group-item"
                  key={productItem.id}
                >
                  {productToEdit?.id === productItem.id ? (
                    <form className="d-flex justify-content-between w-100">
                      <div>
                        <input
                          className="form-control"
                          value={productToEdit?.name}
                          onChange={handleEditName}
                        />
                      </div>
                      <div>
                        <Button
                          variant="primary"
                          className="me-2"
                          style={{ whiteSpace: "nowrap" }}
                          onClick={handleEditProduct}
                        >
                          Save
                        </Button>
                        <Button
                          variant="success"
                          style={{ whiteSpace: "nowrap" }}
                          onClick={() => setProductToEdit(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div>
                        {productItem.id} - {productItem.name}
                      </div>
                      <div className="d-flex">
                        <Button
                          className="me-2"
                          variant="info"
                          onClick={() => setProductToEdit(productItem)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => setProductToDelete(productItem)}
                        >
                          Delete
                        </Button>
                      </div>
                    </>
                  )}
                </li>
              );
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
