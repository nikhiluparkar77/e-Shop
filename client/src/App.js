import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import HomeComponent from "./Component/HomeComponent";
import ProductDetails from "./Component/ProductDetails";
import Header from "./Component/Comman/Header";
import FooterComponant from "./Component/Comman/Footer";

const client = new ApolloClient({ uri: "http://localhost:5000/graphql" });

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route path="/details/:productId" component={ProductDetails} />
            <Route path="/" component={HomeComponent} />
          </Switch>
          <FooterComponant />
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
