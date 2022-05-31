import React, { Component } from "react";
import { FlatList, ScrollView, Text, View, Modal, YellowBox, Button } from "react-native";
import { Card, Icon, Image, Rating, Input } from "react-native-elements";
import { connect } from "react-redux";
import { postFavorite, postComment } from "../redux/ActionCreators";
import { baseUrl } from "./../shared/baseUrl";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
});

class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      rating: 3,
      author: "",
      comment: "",
      // comments: COMMENTS,
      // dishes: DISHES,
      // favorites: [],
    };
    YellowBox.ignoreWarnings(["VirtualizedLists should never be nested"]); // ref: https://forums.expo.io/t/warning-virtualizedlists-should-never-be-nested-inside-plain-scrollviews-with-the-same-orientation-use-another-virtualizedlist-backed-container-instead/31361/6
  }
  render() {
    const dishId = parseInt(this.props.route.params.dishId);

    // const dish = this.props.dishes.dishes[dishId];
    // const comments = this.props.comments.comments.filter((cmt) => cmt.dishId === dishId);
    // const favorite = this.props.favorites.some((el) => el === dishId);

    return (
      <ScrollView>
        <RenderDish
          dish={this.props.dishes.dishes[dishId]}
          favorite={this.props.favorites.some((el) => el === dishId)}
          onPressFavorite={() => this.markFavorite(dishId)}
          onPressComment={() => this.setState({ showModal: true })}
        />
        <RenderComments
          comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)}
        />
        <Modal
          visible={this.state.showModal}
          onRequestClose={() => this.setState({ showModal: false })}
        >
          <View style={{ justifyContent: "center", margin: 50 }}>
            <Rating
              startingValue={this.state.rating}
              showRating={true}
              onFinishRating={(value) => this.setState({ rating: value })}
            />
            <View style={{ height: 20 }} />
            <Input
              value={this.state.author}
              placeholder='Author'
              leftIcon={{ name: "user-o", type: "font-awesome" }}
              onChangeText={(text) => this.setState({ author: text })}
            />
            <Input
              value={this.state.comment}
              placeholder='Comment'
              leftIcon={{ name: "comment-o", type: "font-awesome" }}
              onChangeText={(text) => this.setState({ comment: text })}
            />
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Button
                title='SUBMIT'
                color='#7cc'
                onPress={() => {
                  this.submitComment(dishId);
                  this.setState({ showModal: false });
                }}
              />
              <View style={{ width: 10 }} />
              <Button
                title='CANCEL'
                color='#7cc'
                onPress={() => {
                  this.setState({ showModal: false });
                }}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }
  submitComment(dishId) {
    this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
  }

  // end class Dishdetail
}

class RenderComments extends Component {
  render() {
    const comments = this.props.comments;
    return (
      <Card>
        <Card.Title>Comments</Card.Title>
        <Card.Divider />
        <FlatList
          data={comments}
          renderItem={({ item, index }) => this.renderCommentItem(item, index)}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    );
  }
  renderCommentItem(item, index) {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Rating
          readonly
          imageSize={15}
          style={{ paddingVertical: 5, flexDirection: "row", justifyContent: "flex-start" }}
          startingValue={item.rating}
        />
        {/* <Text style={{ fontSize: 12 }}> {item.rating} Stars</Text> */}
        <Text style={{ fontSize: 12 }}>{"-- " + item.author + ", " + item.date} </Text>
      </View>
    );
  }
}

class RenderDish extends Component {
  render() {
    const dish = this.props.dish;
    if (dish != null) {
      return (
        <Card>
          <Image
            // source={require("./images/uthappizza.png")}
            source={{ uri: baseUrl + dish.image }}
            style={{
              width: "100%",
              height: 100,
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card.FeaturedTitle>{dish.name}</Card.FeaturedTitle>
          </Image>

          {/* <Text style={{ margin: 10 }}>{dish.description}</Text> */}
          <Card.FeaturedSubtitle style={{ color: "black" }}>
            {dish.description}
          </Card.FeaturedSubtitle>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Icon
              raised
              reverse
              type='font-awesome'
              color='#f50'
              name={this.props.favorite ? "heart" : "heart-o"}
              onPress={() =>
                this.props.favorite ? alert("Already favorite") : this.props.onPressFavorite()
              }
            />
            <Icon
              raised
              reverse
              name={"pencil"}
              type='font-awesome'
              color={"#512DA8"}
              onPress={() => this.props.onPressComment()}
            />
          </View>
        </Card>
      );
    }
    return <View />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
