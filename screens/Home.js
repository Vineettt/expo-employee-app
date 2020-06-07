import React from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { Card, FAB } from "react-native-paper";

const Home = ({ navigation }) => {
  const data = [
    {
      id: "1",
      name: "vin",
      email: "dev@dev.in",
      salary: "5 lpa",
      phone: "123",
      position: "web dev",
      picture:
        "https://images.unsplash.com/photo-1491382825904-a4c6dca98e8c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    },
    {
      id: "2",
      name: "vin1",
      email: "dev1@dev.in",
      salary: "5 lpa",
      phone: "1232",
      position: "web dev",
      picture:
        "https://images.unsplash.com/photo-1491382825904-a4c6dca98e8c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    },
    {
      id: "3",
      name: "vin2",
      email: "dev2@dev.in",
      salary: "5 lpa",
      phone: "12123",
      position: "web dev",
      picture:
        "https://images.unsplash.com/photo-1491382825904-a4c6dca98e8c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    },
    {
      id: "4",
      name: "vin3",
      email: "dev3@dev.in",
      salary: "5 lpa",
      phone: "12123",
      position: "ml expert",
      picture:
        "https://images.unsplash.com/photo-1491382825904-a4c6dca98e8c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    },
  ];
  const renderList = (item) => {
    return (
      <Card
        style={styles.mycard}
        key={item.id}
        onPress={() => navigation.navigate("Profile", { item })}
      >
        <View style={styles.cardView}>
          <Image
            style={{
              width: 60,
              height: 60,
              borderRadius: 60 / 2,
            }}
            source={{
              uri:
                "https://images.unsplash.com/photo-1491382825904-a4c6dca98e8c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
            }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.text}>{item.name}</Text>
            <Text>{item.position}</Text>
          </View>
        </View>
      </Card>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return renderList(item);
        }}
        keyExtractor={(item) => item.id}
      />
      <FAB
        style={styles.fab}
        small
        icon="plus"
        theme={{ colors: { accent: "#006aff" } }}
        onPress={() => navigation.navigate("Create")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mycard: {
    margin: 5,
  },
  cardView: {
    flexDirection: "row",
    padding: 5,
  },
  text: {
    fontSize: 18,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Home;
