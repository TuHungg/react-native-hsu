import React, { Component } from "react";
import { View, ScrollView, Text } from "react-native";
import { Card, Divider, Image, Button, Icon } from "react-native-elements";
import Animated from "react-native-reanimated";
import * as Animatable from "react-native-animatable";
import * as MailComposer from "expo-mail-composer";
import { getDatabase, ref, child, onValue } from "firebase/database";
export class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: "",
      street: "",
      district: "",
      city: "",
      phone: "",
      fax: "",
      email: "",
    };
  }
  render() {
    const title = "Contact Information";
    return (
      <Animatable.View animation={"fadeInDown"} duration={2000} delay={1000}>
        <Card>
          <Card.Title style={{ fontWeight: "bold", fontSize: 20 }}>{title}</Card.Title>
          <Divider />
          <Text style={{ margin: 10 }}>121, Clear Water Bay Road </Text>
          <Text style={{ margin: 10 }}>Clear Water Bay, Kowloon </Text>
          <Text style={{ margin: 10 }}>Quang Ngai</Text>
          <Text style={{ margin: 10 }}>Tel: +852 1234 5678</Text>
          <Text style={{ margin: 10 }}>Fax: +852 8765 4321</Text>
          <Text style={{ margin: 10 }}>Email:confusion@food.net</Text>
          <Button
            title='Send Email'
            buttonStyle={{ backgroundColor: "#7cc" }}
            icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
            onPress={this.sendMail}
          />
        </Card>
      </Animatable.View>
    );
  }
  sendMail() {
    MailComposer.composeAsync({
      recipients: ["tuhoanghaihung@gmai.com"],
      subject: "From Confusion",
      body: "Hello my Hung QN ...",
    });
  }

  componentDidMount() {
    const dbRef = ref(getDatabase());
    onValue(child(dbRef, "contact/"), (snapshot) => {
      const value = snapshot.val();
      this.setState({
        number: value.address.number,
        street: value.address.street,
        district: value.address.district,
        city: value.address.city,
        phone: value.phone,
        fax: value.fax,
        email: value.email,
      });
    });
  }
}

export default Contact;
