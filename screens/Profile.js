import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  Platform,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Title, Card } from "react-native-paper";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Button } from "react-native-paper";

const Profile = (props) => {
  const {
    _id,
    name,
    picture,
    phone,
    salary,
    email,
    position,
  } = props.route.params.item;
  const openDail = () => {
    if (Platform.OS === "android") {
      Linking.openURL(`tel:${phone}`);
    } else {
      Linking.openURL(`telprompt:${phone}`);
    }
  };

  const deleteEmployee = () => {
    fetch("https://c0dd26231e91.ngrok.io/delete", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: _id,
      }),
    })
      .then((res) => res.json())
      .then((deletedEmployee) => {
        console.log(deletedEmployee);
        Alert.alert(`${name} deleted`);
        props.navigation.navigate("Home");
      })
      .catch((err) => {
        Alert.alert("Something Went Wrong");
      });
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["#0033ff", "#6bc1ff"]}
        style={{
          height: "20%",
        }}
      />
      <View style={{ alignItems: "center" }}>
        <Image
          style={{
            width: 140,
            height: 140,
            borderRadius: 140 / 2,
            marginTop: -50,
          }}
          source={{
            uri: picture,
          }}
        />
      </View>
      <View style={{ alignItems: "center", margin: 15 }}>
        <Title>{name}</Title>
        <Title style={{ fontSize: 15 }}>{position}</Title>
      </View>
      <Card
        style={styles.myCard}
        onPress={() => {
          Linking.openURL(`mailto:${email}`);
        }}
      >
        <View style={styles.cardContent}>
          <MaterialIcons name="email" size={32} color="#006aff" />
          <Title style={styles.mytext}>{email}</Title>
        </View>
      </Card>
      <Card style={styles.myCard} onPress={() => openDail()}>
        <View style={styles.cardContent}>
          <AntDesign name="phone" size={32} color="#006aff" />
          <Title style={styles.mytext}>{phone}</Title>
        </View>
      </Card>
      <Card style={styles.myCard}>
        <View style={styles.cardContent}>
          <MaterialIcons name="attach-money" size={32} color="#006aff" />
          <Title style={styles.mytext}>{salary}</Title>
        </View>
      </Card>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 10,
        }}
      >
        <Button
          style={styles.inputStyles}
          icon="account-edit"
          mode="contained"
          theme={theme}
          onPress={() =>
            props.navigation.navigate("Create", {
              _id,
              name,
              picture,
              phone,
              salary,
              email,
              position,
            })
          }
        >
          Edit
        </Button>
        <Button
          style={styles.inputStyles}
          icon="delete"
          mode="contained"
          theme={theme}
          onPress={() => deleteEmployee()}
        >
          Fire Employee
        </Button>
      </View>
    </View>
  );
};

const theme = {
  color: {
    primary: "#006aff",
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  myCard: {
    margin: 3,
  },
  cardContent: {
    flexDirection: "row",
    padding: 8,
  },
  mytext: {
    fontSize: 18,
    marginTop: 3,
    marginLeft: 5,
  },
});

export default Profile;
