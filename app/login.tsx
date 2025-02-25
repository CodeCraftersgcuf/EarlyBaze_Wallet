import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/contexts/themeContext";
import { COLORS, images } from "@/constants";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { validationSignInSchema } from "@/utils/validation";
import { Formik } from "formik";
import React from "react";
import Input from "@/utils/CustomInput";
import Button from "@/utils/Button";
import { router, useRouter } from "expo-router";
import useLoadFonts from "@/hooks/useLoadFonts";
import { loginUser } from "@/utils/mutations/authMutations";

//Related to the Integration of the Login Page
import { useMutation } from '@tanstack/react-query';

export interface InputValues {
  email: string;
  password: string;
}

const Login = () => {
  const { dark } = useTheme();
  const { push } = useRouter();
  const fontsLoaded = useLoadFonts(); // Load custom fonts

  // Mutation for Login
  const { isPending: isPendingLogin, mutate: mutateLogin } = useMutation({
    mutationFn: (data: InputValues) => loginUser(data),
    onSuccess: async (data) => {
      try {
        console.log("✅ Login Successful:", data);
        push("/(tabs)");
      } catch (error) {
        console.error("❌ Error saving data:", error);
      }
    },
    onError: (error) => {
      console.error("❌ Login Failed:", error);
      alert(error.message || "Login failed, please try again.");
    }
  });


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={images.authImg}
            style={styles.image}
            contentFit="cover"
          />

          <View style={styles.middleImageContainer}>
            <Image source={images.authMidCircle} style={styles.middleImg} />
          </View>

          <View
            style={[
              styles.bottomBox,
              { backgroundColor: dark ? COLORS.black : COLORS.white },
            ]}
          >
            <View style={styles.loginContainer}>
              <Text style={[styles.loginText, { fontFamily: fontsLoaded ? 'Caprasimo-Regular' : undefined }]}>Login</Text>
            </View>

            <Text
              style={[
                styles.bottomBoxText,
                { color: dark ? COLORS.white : COLORS.black },
              ]}
            >
              <View>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={validationSignInSchema}
                  onSubmit={(values) => mutateLogin(values)} // ✅ Calls mutateLogin on form submit
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
                          Email
                        </Text>
                        <Input
                          value={values.email}
                          onChangeText={handleChange("email")}
                          onBlur={handleBlur("email")}
                          label="Input email address"
                          keyboardType="email-address"
                          errorText={touched.email && errors.email ? errors.email : ""}
                          showCheckbox={false}
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
                          Password
                        </Text>
                        <Input
                          value={values.password}
                          onChangeText={handleChange("password")}
                          onBlur={handleBlur("password")}
                          label="Input Password"
                          secureTextEntry
                          showCheckbox={false}
                          prefilledValue={values.password}
                          id="password"
                        />
                      </View>
                      <TouchableOpacity onPress={() => push("/forgetpassword")}>
                        <Text
                          style={{
                            color: COLORS.primary,
                            textAlign: "right",
                            position: "relative",
                            bottom: 12,
                          }}
                        >
                          Forget Password ?
                        </Text>
                      </TouchableOpacity>
                      <View>
                        {/* ✅ Login Button now triggers handleSubmit which calls mutateLogin */}
                        <Button
                          title={isPendingLogin ? "Logging in..." : "Login"}
                          onPress={handleSubmit}
                          disabled={isPendingLogin}
                        />
                      </View>
                      <View style={styles.bottomBoxText}>
                        <Text
                          style={{
                            textAlign: "center",
                            color: dark ? COLORS.white : COLORS.black,
                          }}
                        >
                          Don't have an account ?
                          <TouchableOpacity onPress={() => push("/register")}>
                            <Text
                              style={{
                                color: COLORS.primary,
                                fontWeight: "bold",
                              }}
                            >
                              {" "} Sign Up
                            </Text>
                          </TouchableOpacity>
                        </Text>
                      </View>
                    </View>
                  )}
                </Formik>
              </View>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: "100%",
    height: Dimensions.get("window").height - 20,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  middleImageContainer: {
    position: "absolute",
    top: "35%",
    left: "50%",
    transform: [
      { translateX: -Dimensions.get("window").width * 0.18 },
      { translateY: -Dimensions.get("window").width * 0.3 },
    ],
    width: Dimensions.get("window").width * 0.36,
    height: Dimensions.get("window").width * 0.36,
    borderRadius: Dimensions.get("window").width * 0.18,
    borderWidth: 2,
    borderColor: COLORS.greyscale300,
    justifyContent: "center",
    alignItems: "center",
  },
  middleImg: {
    width: "80%",
    height: "80%",
  },
  bottomBox: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "center",
    paddingVertical: 20,
    zIndex: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  formContainer: {
    width: "100%",
    flex: 1,
    height: "100%",
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
  },
  loginContainer: {
    position: "absolute",
    paddingVertical: 10,
    zIndex: 1,
    top: -50,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    marginBottom: 10,
  },
});

export default Login;
