import React, { Component } from "react";

class ProductsHome extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>Products Home</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
      user,
      users
  };
}

const ProductHomePage = connect(mapStateToProps)(ProductsHome);
export { ProductHomePage as ProductsHome };
