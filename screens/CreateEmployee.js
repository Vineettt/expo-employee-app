import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const CreateEmployee = ({ navigation, route }) => {
  const getDetails = (type) => {
    if (route.params) {
      switch (type) {
        case "name":
          return route.params.name;
        case "phone":
          return route.params.phone;
        case "email":
          return route.params.email;
        case "salary":
          return route.params.salary;
        case "picture":
          return route.params.picture;
        case "position":
          return route.params.position;
      }
    }
    return "";
  };
  const [name, setName] = useState(getDetails("name"));
  const [phone, setPhone] = useState(getDetails("phone"));
  const [email, setEmail] = useState(getDetails("email"));
  const [salary, setSalary] = useState(getDetails("salary"));
  const [picture, setPicture] = useState(getDetails("picture"));
  const [position, setPosition] = useState(getDetails("position"));
  const [modal, setModal] = useState(false);
  const [enableshift, setenableShift] = useState(false);

  const submitData = () => {
    fetch("https://c0dd26231e91.ngrok.io/send-data", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone, email, salary, picture, position }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert("Saved SuccessFully!!!");
        navigation.navigate("Home");
      })
      .catch((err) => {
        Alert.alert("Something Went Wrong");
      });
  };

  const updateDetails = () => {
    fetch("https://c0dd26231e91.ngrok.io/update", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: route.params._id,
        name,
        phone,
        email,
        salary,
        picture,
        position,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert("Updated SuccessFully!!!");
        navigation.navigate("Home");
      })
      .catch((err) => {
        Alert.alert("Something Went Wrong");
      });
  };

  const pickFromGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newFile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test.${data.uri.split(".")[1]}`,
        };
        handleUpload(newFile);
      }
    } else {
      Alert.alert("Need Permission to access Images");
    }
  };

  const pickFromCamera = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newFile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test.${data.uri.split(".")[1]}`,
        };
        handleUpload(newFile);
      }
    } else {
      Alert.alert("Need Permission to access Images");
    }
  };

  const handleUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "APP_NAME"); //create a bucket
    data.append("cloud_name", "USERNAME"); // cloudinar account username
    fetch("https://api.cloudinary.com/v1_1/USERNAME/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setPicture(data.url);
        setModal(false);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior="position"
      style={styles.root}
      enabled={enableshift}
    >
      <View>
        <TextInput
          label="Name"
          style={styles.inputStyles}
          value={name}
          onFocus={() => setenableShift(false)}
          mode="outlined"
          theme={theme}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          label="Email"
          style={styles.inputStyles}
          value={email}
          onFocus={() => setenableShift(false)}
          mode="outlined"
          theme={theme}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          label="Phone"
          style={styles.inputStyles}
          value={phone}
          onFocus={() => setenableShift(false)}
          keyboardType="number-pad"
          mode="outlined"
          theme={theme}
          onChangeText={(text) => setPhone(text)}
        />
        <TextInput
          label="Salary"
          style={styles.inputStyles}
          value={salary}
          onFocus={() => setenableShift(true)}
          mode="outlined"
          theme={theme}
          onChangeText={(text) => setSalary(text)}
        />
        <TextInput
          label="Position"
          style={styles.inputStyles}
          value={position}
          onFocus={() => setenableShift(true)}
          mode="outlined"
          theme={theme}
          onChangeText={(text) => setPosition(text)}
        />
        <Button
          style={styles.inputStyles}
          icon={picture == "" ? "upload" : "check"}
          mode="contained"
          onPress={() => setModal(true)}
        >
          upload Image
        </Button>
        {route.params ? (
          <Button
            style={styles.inputStyles}
            icon="content-save"
            mode="contained"
            theme={theme}
            onPress={() => updateDetails()}
          >
            Update
          </Button>
        ) : (
          <Button
            style={styles.inputStyles}
            icon="content-save"
            mode="contained"
            theme={theme}
            onPress={() => submitData()}
          >
            save
          </Button>
        )}
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
                onPress={() => pickFromCamera()}
              >
                camera
              </Button>
              <Button
                icon="image-area"
                mode="contained"
                theme={theme}
                onPress={() => pickFromGallery()}
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
    </KeyboardAvoidingView>
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
