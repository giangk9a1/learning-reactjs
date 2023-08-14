import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ProductList() {
  const refInputNameEl = useRef(null);
  const [error, setError] = useState("");
  const [productName, setProductName] = useState("");
  const [productList, setProductList] = useState([
    { id: 10, name: "Dien thoai Samsung" },
    { id: 11, name: "Dien thoai Oppo" },
    { id: 12, name: "Dien thoai Apple" },
	]);

  const [productToDelete, setProductToDelete] = useState(null);

  function handleAddNewProduct(event) {
    event.preventDefault();

    if (!productName.trim()) {
      setError("Ten khong hop le. Vui long nhap lai!");
      refInputNameEl.current.focus();
      return;
    }

    setError("");
    setProductName("");
    setProductList([
      ...productList,
      { id: parseInt(Math.random() * 999), name: productName.trim() },
    ]);
  }

  function onChangeName(event) {
    setProductName(event.target.value);
  }

  function handleOpenModelDelete(productData) {
		setProductToDelete(productData);
	}

	const handleClose = () => {
    setProductToDelete(null);
	};

	function handleDelete() {
		if (!productToDelete) return

		setProductList(productList.filter(p => p.id !== productToDelete.id))
		handleClose()
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
            type="name"
            className={error ? "is-invalid form-control" : "form-control"}
            placeholder="Nhap ten san pham"
            value={productName}
            onChange={onChangeName}
          />
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
        <button className="btn btn-primary" style={{ whiteSpace: "nowrap" }}>
          Them Moi
        </button>
      </form>
      <div className="row mt-5">
        <div className="col-3">
          <ul className="list-group">
            {productList.map((productItem) => {
              return (
                <li
                  className="d-flex justify-content-between list-group-item"
                  key={productItem.id}
                >
                  {productItem.id} - {productItem.name}
                  <button
                    onClick={() => handleOpenModelDelete(productItem)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Body>Ban co muon xoa san pham "{productToDelete?.name}" khong?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProductList;
