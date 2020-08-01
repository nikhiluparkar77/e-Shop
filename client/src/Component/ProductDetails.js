import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const GET_PRODUCT = gql`
  query productDetails($Pid: String) {
    productDetails(id: $Pid) {
      _id
      productname
      price
      size
      description
      productImage
    }
  }
`;
const ProductDetails = (props) => {
  return (
    <Query
      query={GET_PRODUCT}
      variables={{ Pid: props.match.params.productId }}
    >
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        {
          console.log(data.productDetails);
        }
        return (
          <div className="HomeComponent homePadding">
            <diV className="container">
              <div className="row">
                <div className="col-md-5">
                  <figure>
                    <Zoom>
                      <picture>
                        <source
                          media="(max-width: 800px)"
                          srcSet={data.productDetails.productImage}
                        />
                        <img
                          src={data.productDetails.productImage}
                          className="img-fluid"
                          alt={data.productDetails.productname}
                        />
                      </picture>
                    </Zoom>
                  </figure>
                </div>
                <div className="col-md-7">
                  <h2 className="ProductDetails">Product Details:-</h2>
                  <hr />
                  <p>
                    Name:{" "}
                    <b className="details">{data.productDetails.productname}</b>
                  </p>
                  <p>
                    Price:{" "}
                    <b className="details">{data.productDetails.price}</b>
                  </p>
                  <p>Size: {data.productDetails.size}</p>
                  <div className="ProductButtons">
                    <button className="btn btn-secondary">Add To Cart</button>
                    &nbsp;&nbsp;&nbsp;
                    <button className="btn btn-secondary">Buy Now</button>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-md-12">
                  <p>
                    Description: <br />
                    {data.productDetails.description}
                  </p>
                </div>
              </div>
            </diV>
          </div>
        );
      }}
    </Query>
  );
};

export default ProductDetails;
