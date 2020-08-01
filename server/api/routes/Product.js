const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
} = require("graphql");
const ProductModel = require("../model/Product");

const productType = new GraphQLObjectType({
  name: "product",
  fields: function () {
    return {
      _id: { type: GraphQLString },
      productname: { type: GraphQLString },
      size: { type: GraphQLString },
      description: { type: GraphQLString },
      price: { type: GraphQLInt },
      productImage: { type: GraphQLString },
    };
  },
});

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: function () {
    return {
      products: {
        type: new GraphQLList(productType),
        resolve: function () {
          const products = ProductModel.find().exec();
          if (!products) {
            throw new Error("Error");
          }
          return products;
        },
      },

      productDetails: {
        type: productType,
        args: {
          id: {
            name: "_id",
            type: GraphQLString,
          },
        },
        resolve: function (root, params) {
          const productDetails = ProductModel.findById(params.id).exec();
          if (!productDetails) {
            throw new Error("Error");
          }
          return productDetails;
        },
      },
    };
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: function () {
    return {
      addProduct: {
        type: productType,
        args: {
          productname: { type: new GraphQLNonNull(GraphQLString) },
          size: { type: new GraphQLNonNull(GraphQLString) },
          description: { type: new GraphQLNonNull(GraphQLString) },
          price: { type: new GraphQLNonNull(GraphQLInt) },
          productImage: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: function (root, params) {
          const productModel = new ProductModel(params);
          const newProduct = productModel.save();
          if (!newProduct) {
            throw new Error("Error");
          }
          return newProduct;
        },
      },
      updateProduct: {
        type: productType,
        args: {
          _id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLString),
          },
          productname: { type: new GraphQLNonNull(GraphQLString) },
          size: { type: new GraphQLNonNull(GraphQLString) },
          description: { type: new GraphQLNonNull(GraphQLString) },
          price: { type: new GraphQLNonNull(GraphQLInt) },
          productImage: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve(root, params) {
          return ProductModel.findByIdAndUpdate(
            params.id,
            {
              productname: params.productname,
              size: params.size,
              description: params.description,
              price: params.price,
              productImage: params.productImage,
            },
            function (err) {
              if (err) return next(err);
            }
          );
        },
      },

      removeProduct: {
        type: productType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve: function (root, params) {
          const remProduct = ProductModel.findByIdAndRemove(params.id).exec();
          if (!remProduct) {
            throw new Error("Error");
          }
          return remProduct;
        },
      },
    };
  },
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });
