import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/contexts/themeContext";
import { COLORS, icons, images } from "@/constants";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { validationRegistrationSchema } from "@/utils/validation";
import { Formik } from "formik";
import React from "react";
import Input from "@/utils/CustomInput";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import Button from "@/utils/Button";
import { useRouter } from "expo-router";

const Register = () => {
  const { dark } = useTheme();
  const { push } = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!result.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    let resultStatus = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!resultStatus.canceled) {
      setSelectedImage(resultStatus.assets[0].uri);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.imageContainer}>
          <Image
            source={images.authImg}
            style={styles.image}
            contentFit="cover"
          />

          <View style={styles.middleImageContainer}>
            <TouchableOpacity
              style={[
                styles.cameraContainer,
                selectedImage && { backgroundColor: "transparent", top: 30 },
              ]}
              onPress={pickImage}
            >
              <Image
                source={selectedImage ? selectedImage : icons.camera}
                style={[
                  styles.cameraIcon,
                  selectedImage && {
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    marginBottom: 10,
                  },
                ]}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomBox}>
            <View
              style={[{ backgroundColor: dark ? COLORS.black : COLORS.white }]}
            >
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Register</Text>
              </View>
              <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
              >
                <Formik
                  initialValues={{
                    username: "",
                    email: "",
                    phoneNumber: "",
                    password: "",
                    referralCode: "",
                  }}
                  onSubmit={(values) => console.log(values)}
                  validationSchema={validationRegistrationSchema}
                >
                  {({
                    handleChange,
                    handleBlur,
                    touched,
                    handleSubmit,
                    values,
                    errors,
                  }) => (
                    <View style={styles.formContainer}>
                      <View>
                        <Text
                          style={[
                            styles.inputLabel,
                            { color: dark ? COLORS.white : COLORS.black },
                          ]}
                        >
                          Username
                        </Text>
                        <Input
                          value={values.username}
                          onChangeText={handleChange("username")}
                          onBlur={handleBlur("username")}
                          label="Input Username"
                          keyboardType="default"
                          showCheckbox={false}
                          errorText={
                            touched.username && errors.username
                              ? errors.username
                              : ""
                          }
                          prefilledValue={values.username}
                          id="username"
                        />
                      </View>
                      <View>
                        <Text
                          style={[
                            styles.inputLabel,
                            { color: dark ? COLORS.white : COLORS.black },
                          ]}
                        >
                          Email
                        </Text>
                        <Input
                          value={values.email}
                          onChangeText={handleChange("email")}
                          onBlur={handleBlur("email")}
                          label="Input Email"
                          keyboardType="email-address"
                          showCheckbox={false}
                          errorText={
                            touched.email && errors.email ? errors.email : ""
                          }
                          prefilledValue={values.email}
                          id="email"
                        />
                      </View>
                      <View>
                        <Text
                          style={[
                            styles.inputLabel,
                            { color: dark ? COLORS.white : COLORS.black },
                          ]}
                        >
                          Phone Number
                        </Text>
                        <Input
                          value={values.phoneNumber}
                          onChangeText={handleChange("phoneNumber")}
                          onBlur={handleBlur("phoneNumber")}
                          keyboardType="phone-pad"
                          label="Input Phone Number"
                          showCheckbox={false}
                          errorText={
                            touched.phoneNumber && errors.phoneNumber
                              ? errors.phoneNumber
                              : ""
                          }
                          prefilledValue={values.phoneNumber}
                          id="phoneNumber"
                        />
                      </View>
                      <View>
                        <Text
                          style={[
                            styles.inputLabel,
                            { color: dark ? COLORS.white : COLORS.black },
                          ]}
                        >
                          Password
                        </Text>
                        <Input
                          value={values.password}
                          onChangeText={handleChange("password")}
                          onBlur={handleBlur("password")}
                          label="Input Password"
                          keyboardType="default"
                          showCheckbox={false}
                          errorText={
                            touched.password && errors.password
                              ? errors.password
                              : ""
                          }
                          prefilledValue={values.password}
                          id="password"
                        />
                      </View>
                      <View>
                        <Text
                          style={[
                            styles.inputLabel,
                            { color: dark ? COLORS.white : COLORS.black },
                          ]}
                        >
                          Referral Code
                        </Text>
                        <Input
                          value={values.referralCode}
                          onChangeText={handleChange("referralCode")}
                          onBlur={handleBlur("referralCode")}
                          label="Input Referral Code"
                          keyboardType="default"
                          showCheckbox={false}
                          errorText={
                            touched.referralCode && errors.referralCode
                              ? errors.referralCode
                              : ""
                          }
                          prefilledValue={values.referralCode}
                          id="referralCode"
                        />
                      </View>
                      <View>
                        <Button
                          title="Register"
                          // onPress={() => handleSubmit()}
                          onPress={() => push("/Otp")} // 
                        />
                      </View>
                      <View style={styles.bottomBoxText}>
                        <Text
                          style={{
                            textAlign: "center",
                            color: dark ? COLORS.white : COLORS.black,
                          }}
                        >
                          Already have an account ?
                          <TouchableOpacity onPress={() => push("/login")}>
                            <Text
                              style={{
                                color: COLORS.primary,
                                fontWeight: "bold",
                                marginLeft: 5,
                              }}
                            >
                              Sign In
                            </Text>
                          </TouchableOpacity>
                        </Text>
                      </View>
                    </View>
                  )}
                </Formik>
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  middleImageContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  cameraContainer: {
    zIndex: 10,
    backgroundColor: COLORS.white,
    padding: 30,
    borderRadius: 50,
    top: 60,
  },
  cameraIcon: {
    padding: 10,
    width: 30,
    resizeMode: "contain",
    height: 30,
  },
  imageContainer: {
    width: "100%",
    height: Dimensions.get("window").height,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  bottomBox: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    top: 200,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },
  inputLabel: {
    fontSize: 16,
  },
  loginContainer: {
    position: "absolute",
    paddingVertical: 10,
    zIndex: 1,
    top: -30,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    width: "100%",
  },
  loginText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.white,
  },
  bottomBoxText: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default Register;
