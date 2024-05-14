// import AppCounter from './AppCounter';
// import AppProduct from './AppProduct';
import AppUser from './AppUser';
import { useEffect, useState } from 'react'

function App() {
  const [counter, setCounter] = useState(1)
  const [listUsers, setListUsers] = useState([])

  useEffect(() => {
    console.log('useEffect undefined')
    // Khong co bien phu thuoc, luon luon chay lai sau moi lan render
  })

  useEffect(() => {
    // useEffect la mo hook cung cap san boi React
    //  - quan li duoc so lan chay trong moi lan re-render
    //  - tham so dau tien la callback de thuc thi
    //  - tham so thu hai la mot array or undefined (khong truyen tham so thu 2)

    //  - Neu tham so thu2 la array rong -> Chay 1 lan duy nhat sau lan render dau tien
    fetch('https://api.github.com/users')
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data)
        setListUsers(data)
      })
      .catch((err) => {
        console.log('err', err)
      })
  }, [])

  useEffect(() => {
    // counter thay doi ham nay se chay lai
    console.log('useEffect counter', counter)
  }, [counter])

  console.log('Render')

  return (
    <>
      <AppUser />
      <button onClick={() => setCounter(counter + 1)}>Increase ({counter})</button>
    </>
  )
}

export default App;
