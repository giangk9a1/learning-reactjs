import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import {
  validateFormField,
  validateFullField,
  priceFormatter,
  priceParser,
  isExistError,
  onChange,
  onChangeCreator,
} from "./utils";
import InputNumber from "rc-input-number";

function ProductItem({ productItem, setProductToDelete, handleEditProduct }) {
  const [productToEdit, setProductToEdit] = useState(null);
  const [formErrorEdit, setFormErrorEdit] = useState({});

  const onChangeFormData = onChangeCreator(setProductToEdit, setFormErrorEdit);
  // function onChangeFormData(event, key, setData, setError) {
  //   const value = event.target.value;
  //   const error = validateFormField(key, value)

  //   setProductToEdit({ ...productToEdit, [key]: value });
  //   setFormErrorEdit({ ...formErrorEdit, [key]: error })
  // }

  function handleSubmitEdit(event) {
    event.preventDefault();
    handleEditProduct(productToEdit);
    setProductToEdit(null);
  }

  return (
    <li className="d-flex justify-content-between list-group-item">
      {productToEdit?.id === productItem.id ? (
        <form
          className="d-flex align-items-start w-100"
          //   onSubmit={(event) => {
          //     debugger
          //     handleEditProduct(event, productToEdit)
          //  }}
        >
          <div>
            <input
              type="text"
              className={
                formErrorEdit.name ? "is-invalid form-control" : "form-control"
              }
              placeholder="Nhap ten san pham"
              value={productToEdit.name}
              onChange={(event) => onChangeFormData(event, "name")}
            />
            {formErrorEdit.name && (
              <div className="invalid-feedback">{formErrorEdit.name}</div>
            )}
          </div>
          <div>
            <InputNumber
              step={1}
              value={productToEdit.price}
              onChange={(newPrice) => {
                const event = { target: { value: newPrice ?? "" } };
                console.log("onChange Input Number", newPrice);
                onChangeFormData(event, "price", "edit");
              }}
              prefixCls="giang"
              placeholder="Nhap gia"
              className={formErrorEdit.price ? "is-invalid" : ""}
              formatter={priceFormatter}
              parser={priceParser}
            />
            {formErrorEdit.price && (
              <div className="invalid-feedback">{formErrorEdit.price}</div>
            )}
          </div>
          <div>
            <InputNumber
              min={0}
              max={100}
              step={1}
              value={productToEdit.discount}
              onChange={(newDiscount) => {
                const event = { target: { value: newDiscount ?? "" } };
                console.log("onChange Input Discount", newDiscount);
                onChangeFormData(event, "discount", "edit");
              }}
              prefixCls="giang"
              placeholder="Nhap gia giam"
              className={formErrorEdit.discount ? "is-invalid" : ""}
            />
            {formErrorEdit.discount && (
              <div className="invalid-feedback">{formErrorEdit.discount}</div>
            )}
          </div>
          <Button
            variant="primary"
            className="me-2"
            style={{ whiteSpace: "nowrap" }}
            onClick={handleSubmitEdit}
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
        </form>
      ) : (
        <>
          <div>
            {productItem.id} - {productItem.name} -{" "}
            {productItem.discount ? (
              <>
                <del>{priceFormatter(productItem.price)}</del> -{" "}
                <span>{productItem.price * (100-productItem.discount) * 0.01}</span>
              </>
            ) : (
              productItem.price
            )}
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
}

export default ProductItem;
