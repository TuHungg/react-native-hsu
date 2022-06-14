import React, { Component, useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { Card, Divider, Image } from "react-native-elements";
import { FlatList } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { baseUrl } from "../shared/baseUrl";
import { connect } from "react-redux";
import Loading from "./LoadingComponent";

import * as Animatable from "react-native-animatable";

const mapStateToProps = (state) => {
  return {
    leaders: state.leaders,
  };
};

export class About extends Component {
  constructor(props) {
    super(props);
    /*this.state = {
      leaders: LEADERS
    };*/
  }

  render() {
    const title = "Our History";

    return (
      <ScrollView nestedScrollEnabled={true} style={{ width: "100%", flex: 1 }}>
        <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
          <RenderHistory />
        </Animatable.View>
        <Animatable.View
          style={{ width: "100%", flex: 1 }}
          animation='fadeInUp'
          duration={2000}
          delay={1000}
        >
          <RenderLeadership
            leaders={this.props.leaders.leaders}
            isLoading={this.props.leaders.isLoading}
            errMess={this.props.leaders.errMess}
          />
          <Card>
            <Card.Title style={{ fontWeight: "bold", fontSize: 20 }}>{title}</Card.Title>
            <Divider />
            <Text style={{ margin: 10 }}>
              Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon
              par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be
              found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.
              Featuring four of the best three-star Michelin chefs in the world, you never know what
              will arrive on your plate the next time you visit us.
            </Text>
            <Text style={{ margin: 10 }}>
              The restaurant traces its humble beginnings to The Frying Pan, a successful chain
              started by our CEO, Mr. Peter Pan, that featured for the first time the world's best
              cuisines in a pan.
            </Text>
          </Card>
          <LeaderInfo leaders={this.props.leaders.leaders} />
        </Animatable.View>
      </ScrollView>
    );
  }
}

function LeaderInfo({ leaders }) {
  const title = "Corporate Leadership";

  return (
    <Card style={{ width: "100%" }}>
      <Card.Title style={{ fontWeight: "bold", fontSize: 20, width: "100%" }}>
        Corporate Leadership
      </Card.Title>
      <Divider />

      <FlatList
        data={leaders}
        renderItem={({ item, index }) => renderInfoItem(item, index)}
        keyExtractor={(item) => item.id.toString()}
      />
    </Card>
  );
}

class RenderLeadership extends Component {
  render() {
    if (this.props.isLoading) {
      return (
        <Card>
          <Card.Title>Corporate Leadership</Card.Title>
          <Card.Divider />
          <Loading />
        </Card>
      );
    } else if (this.props.errMess) {
      return (
        <Card>
          <Card.Title>Corporate Leadership</Card.Title>
          <Card.Divider />
          <Text>{this.props.errMess}</Text>
        </Card>
      );
    } else {
      return (
        <Card>
          <Card.Title>Corporate Leadership</Card.Title>
          <Card.Divider />
          <FlatList
            data={this.props.leaders}
            renderItem={({ item, index }) => this.renderLeaderItem(item, index)}
            keyExtractor={(item) => item.id.toString()}
          />
        </Card>
      );
    }
  }
  renderLeaderItem(item, index) {
    return (
      <ListItem key={index}>
        {/* <Avatar rounded source={require("./images/alberto.png")} /> */}
        <Avatar rounded source={{ uri: baseUrl + item.image }} />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "bold" }}>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  }
}

class RenderHistory extends Component {
  render() {
    return (
      <Card>
        <Card.Title>Our History</Card.Title>
        <Card.Divider />
        <Text style={{ margin: 10 }}>
          Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par
          excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found
          nowhere else, it enjoys patronage from the A-list clientele in Hong Kong. Featuring four
          of the best three-star Michelin chefs in the world, you never know what will arrive on
          your plate the next time you visit us.
        </Text>
        <Text style={{ margin: 10 }}>
          The restaurant traces its humble beginnings to The Frying Pan, a successful chain started
          by our CEO, Mr. Peter Pan, that featured for the first time the worlds best cuisines in a
          pan.
        </Text>
      </Card>
    );
  }
}

function renderInfoItem(item, index) {
  return (
    <ListItem key={index}>
      <Avatar source={{ uri: baseUrl + item.image }} rounded={true} />
      <ListItem.Content>
        <ListItem.Title style={{ fontSize: 13, fontWeight: "bold", marginBottom: 10 }}>
          {item.name}
        </ListItem.Title>
        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}

export default connect(mapStateToProps)(About);
