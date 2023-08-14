import { useState, useRef } from 'react'


function ProductList() {
    const refInputNameEl = useRef(null)
    const [error, setError] = useState('')
    const [productName, setProductName] = useState('')
    const [productList, setProductList] = useState([
        { id: 10, name: "Dien thoai Samsung" },
        { id: 11, name: "Dien thoai Oppo" },
        { id: 12, name: "Dien thoai Apple" }
    ])

    function handleAddNewProduct(event) {
        event.preventDefault()

        if (!productName.trim()) {
            setError('Ten khong hop le. Vui long nhap lai!')
            refInputNameEl.current.focus()
            return
        }

        setError('')
        setProductName('')
        setProductList([
            ...productList,
            { id: parseInt(Math.random() * 999), name: productName.trim() }
        ])
    }

    function onChangeName(event) {
        setProductName(event.target.value)
    }

    return (
        <div className="container">
            <h1>ProductList</h1>
            <form className="d-flex align-items-start w-50" onSubmit={handleAddNewProduct}>
                <div>
                    <input
                        ref={refInputNameEl}
                        type="name"
                        className={error ? 'is-invalid form-control' : 'form-control'}
                        placeholder="Nhap ten san pham"
                        value={productName}
                        onChange={onChangeName}
                    />
                    {
                        error && (
                            <div className="invalid-feedback">
                                {error}
                            </div>
                        )
                    }
                </div>
                <button className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>Them Moi</button>
            </form>

            <div className="row mt-5">
                <div className="col-3">
                    <ul className="list-group">
                        {productList.map(productItem => (
                            <li className="list-group-item" key={productItem.id}>
                                {productItem.id} - {productItem.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProductList;