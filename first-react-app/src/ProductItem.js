import Button from "react-bootstrap/Button";

function ProductItem({
  productItem,
  productToEdit,
  setProductToEdit,
  setProductToDelete,
}) {
  return (
    <li className="d-flex justify-content-between list-group-item">
      {productToEdit?.id === productItem.id ? (
        <form className="d-flex justify-content-between w-100">
          {/* <div>
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
			  </div> */}
        </form>
      ) : (
        <>
          <div>
            {productItem.id} - {productItem.name} -{" "}
            {productItem.discount ? (
              <>
									<del>{productItem.price}</del> - <span>{productItem.price * productItem.discount * 0.01}</span>
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
