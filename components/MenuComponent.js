import React, { Component } from "react";
import { FlatList, Text } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { baseUrl } from "../shared/baseUrl";
import { connect } from "react-redux";
import Loading from "./LoadingComponent";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
  };
};

class Menu extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   dishes: DISHES,
    // };
  }
  render() {
    if (this.props.dishes.isLoading) {
      return <Loading />;
    } else if (this.props.dishes.errMess) {
      return <Text>{this.props.errMess}</Text>;
    } else {
      return (
        <FlatList
          // data={this.state.dishes}
          data={this.props.dishes.dishes}
          renderItem={({ item, index }) => this.renderMenuItem(item, index)}
          keyExtractor={(item) => item.id.toString()}
        />
      );
    }
  }

  renderMenuItem(item, index) {
    const { navigate } = this.props.navigation;
    return (
      <ListItem key={index} onPress={() => navigate("Dishdetail", { dishId: item.id })}>
        {/* <Avatar source={require("./images/uthappizza.png")} /> */}
        <Avatar source={{ uri: baseUrl + item.image }} />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  }
}
export default connect(mapStateToProps)(Menu);
