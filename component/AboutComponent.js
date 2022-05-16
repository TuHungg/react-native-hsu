import React, { Component, useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { Card, Divider, Image } from "react-native-elements";
import { FlatList } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { baseUrl } from "../shared/baseUrl";
import { connect } from "react-redux";

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
        <View style={{ width: "100%", flex: 1 }}>
          <Card>
            <Card.Title style={{ fontWeight: "bold", fontSize: 20 }}>
              {title}
            </Card.Title>
            <Divider />
            <Text style={{ margin: 10 }}>
              Started in 2010, Ristorante con Fusion quickly established itself
              as a culinary icon par excellence in Hong Kong. With its unique
              brand of world fusion cuisine that can be found nowhere else, it
              enjoys patronage from the A-list clientele in Hong Kong. Featuring
              four of the best three-star Michelin chefs in the world, you never
              know what will arrive on your plate the next time you visit us.
            </Text>
            <Text style={{ margin: 10 }}>
              The restaurant traces its humble beginnings to The Frying Pan, a
              successful chain started by our CEO, Mr. Peter Pan, that featured
              for the first time the world's best cuisines in a pan.
            </Text>
          </Card>
          <LeaderInfo leaders={this.props.leaders.leaders} />
        </View>
      </ScrollView>
    );
  }
}

function LeaderInfo({ leaders }) {
  const title = "Corporate Leadership";
  // const [leaderInfo, setLeaderInfo] = useState(LEADERS);

  return (
    <Card style={{ width: "100%" }}>
      <Card.Title style={{ fontWeight: "bold", fontSize: 20, width: "100%" }}>
        {title}
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

function renderInfoItem(item, index) {
  return (
    <ListItem key={index}>
      <Avatar source={{ uri: baseUrl + item.image }} rounded={true} />
      <ListItem.Content>
        <ListItem.Title
          style={{ fontSize: 13, fontWeight: "bold", marginBottom: 10 }}
        >
          {item.name}
        </ListItem.Title>
        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}

export default connect(mapStateToProps)(About);
