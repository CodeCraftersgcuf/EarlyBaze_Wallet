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
import { validationResetPasswordSchema } from "@/utils/validation";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import Input from "@/utils/CustomInput";
import Button from "@/utils/Button";
import { useRouter, router, useLocalSearchParams } from "expo-router";
import useLoadFonts from "@/hooks/useLoadFonts";

//Code for the Integration of the Reset Password Screen
import { resetPassword } from '@/utils/mutations/authMutations'
import { useMutation } from '@tanstack/react-query'


const ResetPassword = () => {
  const { dark } = useTheme();
  const {  email } = useLocalSearchParams();
  const [remainingTime, setRemainingTime] = useState(Number(timer) || 60);
  const { back, push } = useRouter();

  c
  console.log("📩 Received email:", email); // Debugging


  // ✅ Reset Password Mutation
  const { mutate: resetPass, isPending: isResettingPass } = useMutation({
    mutationFn: async (data: { email: string; password: string }) =>
      await resetPassword(data),
    onSuccess: (data) => {
      console.log("✅ Reset Password:", data);
      push("/login");
    },
    onError: (error) => {
      console.log("❌ Reset Password Error:", error);
    },
  });

  const fontsLoaded = useLoadFonts(); // Load custom fonts
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={images.authImg}
            style={styles.image}
            contentFit="cover"
          />
          <TouchableOpacity
            style={styles.arrowLeftContainer}
            onPress={() => {
              back();
            }}
          >
            <Image source={images.arrowLeft} style={styles.arrowLeft} />
          </TouchableOpacity>

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
              <Text style={[styles.loginText, { fontFamily: fontsLoaded ? 'Caprasimo-Regular' : undefined }]}>Reset Password</Text>
            </View>

            <Text
              style={[
                styles.bottomBoxText,
                { color: dark ? COLORS.white : COLORS.black },
              ]}
            >
              <View>
                <Formik
                  initialValues={{ password: "", confirmPassword: "" }}
                  onSubmit={(values: any) => console.log(values)}
                  validationSchema={validationResetPasswordSchema}
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
                          New Password
                        </Text>
                        <Input
                          value={values.password}
                          onChangeText={handleChange("password")}
                          onBlur={handleBlur("password")}
                          label="Input new password"
                          errorText={
                            touched.password && errors.password
                              ? errors.password
                              : ""
                          }
                          showCheckbox={false}
                          prefilledValue={values.password}
                          id="new password"
                        />
                      </View>
                      <View>
                        <Text
                          style={[
                            styles.inputLabel,
                            { color: dark ? COLORS.white : COLORS.black },
                          ]}
                        >
                          New Password Again
                        </Text>
                        <Input
                          value={values.confirmPassword}
                          onChangeText={handleChange("confirmPassword")}
                          onBlur={handleBlur("confirmPassword")}
                          label="Input new password again"
                          errorText={
                            touched.confirmPassword && errors.confirmPassword
                              ? errors.confirmPassword
                              : ""
                          }
                          showCheckbox={false}
                          prefilledValue={values.confirmPassword}
                          id="confirmPassword"
                        />
                      </View>

                      <View style={{ paddingVertical: 10, marginBottom: 10 }}>
                        <Button
                          title="Proceed"
                          onPress={() => {
                            if (!values.password || !values.confirmPassword) {
                              alert("Please fill in both password fields.");
                              return;
                            }
                            if (values.password !== values.confirmPassword) {
                              alert("Passwords do not match.");
                              return;
                            }
                            if (!email) {
                              alert("Error: No email found, please restart the process.");
                              return;
                            }

                            resetPass({ email, password: values.password });
                          }}

                        />
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
  arrowLeftContainer: {
    position: "absolute",
    top: 30,
    left: 20,
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 50,
  },
  arrowLeft: {
    width: 18,
    height: 18,
    tintColor: COLORS.dark1,
    objectFit: "contain",
  },
  imageContainer: {
    width: "100%",
    height: Dimensions.get("window").height - 0,
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
    paddingHorizontal: 20,
    paddingBottom: 20,
    height: "100%",
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

export default ResetPassword;
