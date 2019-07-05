import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { Product } from "../Product";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.loadCategories = this.loadCategories.bind(this);
        this.removeCategory = this.removeCategory.bind(this);
        this.createCategory = this.createCategory.bind(this);
        this.editeCategory = this.editeCategory.bind(this);

        this.createProduct = this.createProduct.bind(this);
        this.loadProducts = this.loadProducts.bind(this);

        this.state = {
            categories: [],
            products: []
        };

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }
      loadCategories() {
        this.props.api.loadCategories().then(resp => {
          this.setState({ categories: resp.data });
        });
      }
    
      removeCategory(category) {
        this.props.api
          .removeCategories(category.id)
          .then(resp => this.loadCategories());
      }
    
      createCategory(category) {
        this.props.api.createCategory(category).then(resp => this.loadCategories());
      }
    
      editeCategory(category) {
        this.props.api.editeCategory(category).then(resp => this.loadCategories());
      }
    
      createProduct(product) {
        return this.props.api.createProduct(product);
      }
      loadProducts(category) {
        this.props.api.loadProducts(category).then(resp => {
          this.setState({
            products: resp.data
          });
        });
      }
    render() {
        const { alert } = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <PrivateRoute
                                    path="/products"
                                    render={props => (
                                        <Product
                                            {...props}
                                            loadCategories={this.loadCategories}
                                            removeCategory={this.removeCategory}
                                            categories={this.state.categories}
                                            createCategory={this.createCategory}
                                            editeCategory={this.editeCategory}
                                            createProduct={this.createProduct}
                                            loadProducts={this.loadProducts}
                                            products={this.state.products}
                                        />
                                    )}
                                />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 