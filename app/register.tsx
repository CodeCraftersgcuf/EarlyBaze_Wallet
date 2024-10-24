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


//Related to the Integration of the Register Page
import { signUpUser } from '@/utils/mutations/authMutations'
import { useMutation } from '@tanstack/react-query';


export interface InputValues {
  name: string;
  email: string;
  phone: string;
  password: string;
  invite_code: string;
  picture?: string; // ✅ Add optional picture field
}

const Register = () => {
  const { dark } = useTheme();
  const { push } = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);


  // ✅ Mutation for Register
  const { isPending: isPendingRegister, mutate: mutateRegister } = useMutation({
    mutationFn: (data: InputValues) => signUpUser(data),
    onSuccess: (data, variables) => { // ✅ Get variables (form input data)
      console.log("✅ Register Successful:", data);
      push({ pathname: "/Otp", params: { email: variables.email } }); // ✅ Pass email to OTP screen
    },
    onError: (error) => {
      console.error("❌ Register Failed:", error);
      alert(error.message || "Register failed, please try again.");
    },
  });



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
    <SafeAreaView style={styles.container} >
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
                    name: "",
                    email: "",
                    phone: "",
                    password: "",
                    invite_code: "",
                  }}
                  onSubmit={(values) => {
                    mutateRegister({ ...values, picture: selectedImage || "" }); // ✅ Pass picture if available
                  }}
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
                          value={values.name}
                          onChangeText={handleChange("name")}
                          onBlur={handleBlur("name")}
                          label="Input Username"
                          keyboardType="default"
                          showCheckbox={false}
                          errorText={
                            touched.name && errors.name
                              ? errors.name
                              : ""
                          }
                          prefilledValue={values.name}
                          id="name"
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
                          value={values.phone}
                          onChangeText={handleChange("phone")}
                          onBlur={handleBlur("phone")}
                          keyboardType="phone-pad"
                          label="Input Phone Number"
                          showCheckbox={false}
                          errorText={
                            touched.phone && errors.phone
                              ? errors.phone
                              : ""
                          }
                          prefilledValue={values.phone}
                          id="phone"
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
                          value={values.invite_code}
                          onChangeText={handleChange("invite_code")}
                          onBlur={handleBlur("invite_code")}
                          label="Input Referral Code"
                          keyboardType="default"
                          showCheckbox={false}
                          errorText={
                            touched.invite_code && errors.invite_code
                              ? errors.invite_code
                              : ""
                          }
                          prefilledValue={values.invite_code}
                          id="referralCode"
                        />
                      </View>
                      <View>
                        <Button
                          title={isPendingRegister ? "Registering..." : "Register"} // ✅ Show "Registering..." when pending
                          onPress={() => handleSubmit()}
                          disabled={isPendingRegister} // ✅ Disable button while registering
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
    </SafeAreaView >
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
