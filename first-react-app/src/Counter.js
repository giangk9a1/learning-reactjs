import { useState } from 'react'

// useState là một hàm
//  - Input: Giá trị khởi tạo ban đầu của state
//  - Output: La một array có 2 phần tử.
// Re-render
function Counter(props) {
    const { initCounter = 0, step = 1 } = props
    const [counter, setCounter] = useState(initCounter)

    function handleIncrease() {
        setCounter(counter + step)
    }
    function handleDecrease() {
        setCounter(counter - step)
    }

    return (
        <div>
            <h1>{counter}</h1>
            <button onClick={handleIncrease}>Tang</button>
            <button onClick={handleDecrease}>Giam</button>
        </div>
    )
}

export default Counter