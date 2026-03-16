
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ProductsList from './ProductsList';

function App() {

  return (
    <>
      <section id="center">
        <div className="hero">
          <h1>Welcome to our online store!</h1>
          <p>Discover a wide range of products at unbeatable prices. Shop now and experience the best in online shopping!</p>
        </div>

        <div className="products">
          <h2>Featured Products</h2>
          <ProductsList selectedCategory="all" />
        </div>
      </section>
    </>
  )
}

export default App
