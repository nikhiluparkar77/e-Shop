import React from "react";
import { Link } from "react-router-dom";
import graphql from "graphql-tag";
import { Query } from "react-apollo";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/Slyle.css";

const GET_PRODUCTS = graphql`
  {
    products {
      _id
      productname
      productImage
      price
    }
  }
`;

const HomeComponent = ({}) => {
  return (
    <Query query={GET_PRODUCTS} className="">
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        return (
          <div className="HomeComponent homePadding">
            <div className="container">
              <div className="row">
                {data.products.map((product, index) => (
                  <div key={index} className="col-md-4">
                    <Link
                      to={`/details/${product._id}`}
                      className="ProductLink"
                    >
                      {" "}
                      <div className="ProductBlock">
                        <img
                          src={product.productImage}
                          className="img-fluid"
                          alt={product.productname}
                        />
                        <div className="HoverBlock">
                          <div className="row">
                            <div className="col-md-6">
                              <p>{product.productname}</p>
                              <p>Rs. {product.price}/-</p>
                            </div>
                            <div className="col-md-6">
                              <button className="btn btn-secondary">
                                Buy Now
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default HomeComponent;
