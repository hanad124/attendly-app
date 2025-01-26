import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../../stores/auth";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Toast from "react-native-toast-message";
import { ActivityIndicator } from "react-native";
import * as Device from "expo-device";
import * as Application from "expo-application";

const loginSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(tabs)");
    }
  }, [isAuthenticated]);

  const onSubmit = async (data: LoginFormData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const [deviceName, modelName] = await Promise.all([
        Device.deviceName || "unknown",
        Device.modelName || "unknown",
      ]);

      const uniqueId =
        Platform.OS === "ios"
          ? (await Application.getIosIdForVendorAsync()) || "unknown"
          : (await Application.getAndroidId()) || "unknown";
      const deviceId = `${deviceName}-${modelName}-${uniqueId}`.toLowerCase();

      const deviceInfo = {
        device_id: deviceId,
        device_model: Device.modelName || "Unknown Model",
        device_os: Device.osName || Platform.OS,
        device_os_version: Device.osVersion || Platform.Version.toString(),
      };

      const loginResponse = await login({
        username: data.username,
        password: data.password,
        deviceInfo,
      });

      console.log("Login response:", loginResponse);

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Successfully logged in",
        position: "top",
        visibilityTime: 4000,
      });

      router.replace("/(tabs)");
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage =
        error?.message || "An error occurred while logging in";
      console.log("Error message:", errorMessage);

      let displayMessage = "An error occurred while logging in";

      if (errorMessage.includes("Unregistered device")) {
        displayMessage =
          "This device is not registered. Please contact your administrator to register this device.";
      } else if (errorMessage.includes("Access denied")) {
        displayMessage =
          "This account can only be accessed from its registered device. Please use your registered device or contact support.";
      } else if (error?.status === 401) {
        displayMessage = "Invalid username or password";
      }

      console.log("Display message:", displayMessage);

      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: displayMessage,
        position: "top",
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView className="flex-1">
        <View className="flex-1 px-4 pt-16 pb-6 flex justify-center items-center bg-primary -mb-28">
          <View className="mt-6 mb-28">
            <Image
              source={require("../../../assets/images/loading-logo.png")}
              className="w-32 h-32"
              resizeMode="contain"
            />
            <Text className="text-white text-3xl font-bold">Attendly</Text>
          </View>
        </View>

        <View className="flex-1 bg-white px-4 mt-16 pt-8 border-t border-gray-200 rounded-t-3xl">
          <Text className="text-2xl font-bold mb-2 text-center">
            Welcome Back
          </Text>
          <Text className="text-gray-500 mb-8 text-center">
            Enter your credentials below
          </Text>

          {/* Form */}
          <View className="space-y-4">
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, value } }) => (
                <View>
                  <Text className="text-sm text-gray-600 mb-2">Username</Text>
                  <TextInput
                    className={`w-full h-14 px-4 rounded-lg bg-white ${
                      errors.username
                        ? "border-2 border-red-500"
                        : usernameFocused
                        ? "border-2 border-primary"
                        : "border border-gray-200"
                    }`}
                    placeholder="alinuur"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="default"
                    autoCapitalize="none"
                    editable={!isSubmitting}
                    onFocus={() => setUsernameFocused(true)}
                    onBlur={() => setUsernameFocused(false)}
                    placeholderTextColor="#9CA3AF"
                  />
                  {errors.username && (
                    <Text className="text-red-500 text-sm mt-1">
                      {errors.username.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <View className="mt-4">
                  <Text className="text-sm text-gray-600 mb-2">Password</Text>
                  <View className="relative">
                    <TextInput
                      className={`w-full h-14 px-4 rounded-lg bg-white ${
                        errors.password
                          ? "border-2 border-red-500"
                          : passwordFocused
                          ? "border-2 border-primary"
                          : "border border-gray-200"
                      }`}
                      placeholder="••••••••"
                      value={value}
                      onChangeText={onChange}
                      secureTextEntry={!showPassword}
                      editable={!isSubmitting}
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={() => setPasswordFocused(false)}
                      placeholderTextColor="#9CA3AF"
                    />
                    <TouchableOpacity
                      className="absolute right-4 top-3.5"
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Text className="text-gray-400 font-medium">
                        {showPassword ? "Hide" : "Show"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {errors.password && (
                    <Text className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <TouchableOpacity
              className={`w-full h-14 bg-primary rounded-lg items-center justify-center mt-16 flex-row ${
                isSubmitting ? "opacity-70" : ""
              }`}
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <ActivityIndicator color="white" className="mr-2" />
                  <Text className="text-white font-semibold">
                    Logging in...
                  </Text>
                </>
              ) : (
                <Text className="text-white font-semibold">Login</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Toast
        config={{
          error: ({ text1, text2 }) => (
            <View className="bg-red-100 p-4 rounded-lg mx-4 my-2 border border-red-400">
              <Text className="text-red-800 font-bold">{text1}</Text>
              <Text className="text-red-600">{text2}</Text>
            </View>
          ),
          success: ({ text1, text2 }) => (
            <View className="bg-green-100 p-4 rounded-lg mx-4 my-2 border border-green-400">
              <Text className="text-green-800 font-bold">{text1}</Text>
              <Text className="text-green-600">{text2}</Text>
            </View>
          ),
        }}
      />
    </KeyboardAvoidingView>
  );
}
