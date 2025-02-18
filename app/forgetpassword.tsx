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
import { validationForgetPasswordSchema } from "@/utils/validation";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import Input from "@/utils/CustomInput";
import Button from "@/utils/Button";
import { useRouter } from "expo-router";
import useLoadFonts from "@/hooks/useLoadFonts";

const ForgetPassword = () => {
  const { dark } = useTheme();
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const { back, push } = useRouter();
  const fontsLoaded = useLoadFonts(); // Load custom fonts

  useEffect(() => {
    let intervel: any;
    if (isTimerActive && timer > 0) {
      intervel = setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearTimeout(intervel);
  }, [timer, isTimerActive]);

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
              <Text style={[styles.loginText, { fontFamily: fontsLoaded ? 'Caprasimo-Regular' : undefined }]}>Forget Password</Text>
            </View>

            <Text
              style={[
                styles.bottomBoxText,
                { color: dark ? COLORS.white : COLORS.black },
              ]}
            >
              <View>
                <Formik
                  initialValues={{ email: "", inputPin: "" }}
                  onSubmit={() => { push(`/resetpassword?timer=${timer}`) }}
                  validationSchema={validationForgetPasswordSchema}
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
                          sendCode
                          onSendCodePress={() => {
                            setTimer(60);
                            setIsTimerActive(true);
                          }}
                          keyboardType="email-address"
                          errorText={
                            touched.email && errors.email ? errors.email : ""
                          }
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
                          Input Code
                        </Text>
                        <Input
                          value={values.inputPin}
                          onChangeText={handleChange("inputPin")}
                          onBlur={handleBlur("inputPin")}
                          label="Input pin"
                          errorText={
                            touched.inputPin && errors.inputPin
                              ? errors.inputPin
                              : ""
                          }
                          showCheckbox={false}
                          prefilledValue={values.inputPin}
                          id="inputPin"
                        />
                      </View>
                      <Text style={{ paddingBottom: 10 }}>
                        {isTimerActive && timer > 0 && (
                          <Text style={{ fontWeight: "bold", textAlign: 'center', color: dark ? COLORS.white : COLORS.black }}>OTP can be resent in
                            <Text style={{ color: COLORS.primary }}>{` 00 : ${timer} Sec`}</Text>
                          </Text>
                        )}
                      </Text>
                      <View>
                        <Button
                          title="Proceed"
                          onPress={() => handleSubmit()}
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

export default ForgetPassword;
