import React, { Component } from "react";

class Counter extends Component {
  state = {
    totalCount: 0,
    products: [],
  };
  render() {
    return (
      <>
        <div>
          <span className="text-2xl">Total Products: </span>
          <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
          <button
            onClick={() => this.handleReset()}
            className="btn btn-info m-5"
          >
            Reset
          </button>
          <button
            onClick={this.handleAddProduct}
            className="btn btn-success m-5"
          >
            Add Product
          </button>
        </div>

        <ul>
          {this.state.products.map((product) => (
            <li key={product.id}>
              <span className="badge badge-accent m-5 p-5 ">
                {product.count}
              </span>
              <button
                onClick={() => this.handleIncrement(product.id)}
                className="btn btn-primary m-5"
              >
                +
              </button>
              <button
                onClick={() => this.handleDecrement(product.id)}
                className="btn btn-primary m-5"
              >
                -
              </button>
              <button
                onClick={() => this.handleDelete(product.id, product.count)}
                className="btn btn-error m-5"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  }

  handleReset = () => {
    this.setState(() => ({
      totalCount: 0,
      products: [],
    }));
  };

  handleAddProduct = () => {
    // const newId = this.state.products.length + 1;
    const newId = Date.now();
    const newProduct = { id: newId, count: 0 };

    this.setState({ products: [...this.state.products, newProduct] }, () =>
      console.log(`Updated Products: `, this.state.products)
    );
    console.log(`Product with id ${newId} added`);
  };

  handleDelete = (id, count) => {
    this.setState(
      (prevState) => ({
        products: prevState.products.filter((p) => p.id !== id),
        totalCount: prevState.totalCount - count,
      }),
      () => console.log(`Updated Products: `, this.state.products)
    );
    console.log(`Product with id ${id} deleted`);
  };

  handleIncrement = (id) => {
    this.setState((prevState) => ({
      products: prevState.products.map((p) =>
        p.id === id ? { ...p, count: p.count + 1 } : p
      ),
      totalCount: prevState.totalCount + 1,
    }));
  };

  handleDecrement = (id) => {
    this.setState((prevState) => {
      const productToUpdate = prevState.products.find((p) => p.id === id);
      if (productToUpdate && productToUpdate.count > 0) {
        return {
          products: prevState.products.map((p) =>
            p.id === id ? { ...p, count: p.count - 1 } : p
          ),
          totalCount: prevState.totalCount - 1,
        };
      }
      return prevState; // No change if count is 0
    });
  };

  formatCount = () => {
    const { totalCount } = this.state;
    return totalCount || "Zero";
  };

  getBadgeClasses = () => {
    let badgeClasses = "badge m-2 p-5 ";
    badgeClasses += this.state.totalCount
      ? "badge-secondary"
      : "badge-error text-white";
    return badgeClasses;
  };
}

export default Counter;
