import Counter from './Counter';
import { Header, HeaderNumber } from './Header'

// Component
function AppCounter() {
  return (
    <div className="App">
      <Header />
      <p>{HeaderNumber}</p>
      <hr />
      <Counter />
      <hr />
      <Counter initCounter={10} step={10} />
      <hr />
      <Counter initCounter={100} step={20} />
      <hr />
      <Counter initCounter={1000} step={30} />
    </div>
  );
}

export default AppCounter;
