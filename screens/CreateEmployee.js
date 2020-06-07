import React, { useState } from "react";
import { StyleSheet, Text, View, Modal } from "react-native";
import { TextInput, Button } from "react-native-paper";

const CreateEmployee = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [picture, setNamePicture] = useState("");
  const [modal, setModal] = useState(false);

  return (
    <View style={styles.root}>
      <TextInput
        label="Name"
        style={styles.inputStyles}
        value={name}
        mode="outlined"
        theme={theme}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        label="Email"
        style={styles.inputStyles}
        value={email}
        mode="outlined"
        theme={theme}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        label="Phone"
        style={styles.inputStyles}
        value={phone}
        keyboardType="number-pad"
        mode="outlined"
        theme={theme}
        onChangeText={(text) => setPhone(text)}
      />
      <TextInput
        label="Salary"
        style={styles.inputStyles}
        value={salary}
        mode="outlined"
        theme={theme}
        onChangeText={(text) => setSalary(text)}
      />
      <Button
        style={styles.inputStyles}
        icon="upload"
        mode="contained"
        onPress={() => setModal(true)}
      >
        upload Image
      </Button>
      <Button
        style={styles.inputStyles}
        icon="content-save"
        mode="contained"
        theme={theme}
        onPress={() => console.log("Pressed")}
      >
        save
      </Button>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        theme={theme}
        onRequestClose={() => setModal(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalButtonView}>
            <Button
              icon="camera"
              mode="contained"
              theme={theme}
              onPress={() => console.log("Pressed")}
            >
              camera
            </Button>
            <Button
              icon="image-area"
              mode="contained"
              theme={theme}
              onPress={() => console.log("Pressed")}
            >
              gallery
            </Button>
          </View>
          <Button icon="cancel" theme={theme} onPress={() => setModal(false)}>
            cancel
          </Button>
        </View>
      </Modal>
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
  inputStyles: {
    margin: 5,
  },
  modalButtonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  modalView: {
    position: "absolute",
    bottom: 2,
    width: "100%",
    backgroundColor: "#ffffff",
  },
});

export default CreateEmployee;
