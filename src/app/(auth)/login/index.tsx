import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native'
import { Link, router } from 'expo-router'
import { useEffect, useState } from 'react'
import { useAuthStore } from '../../../stores/auth'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Toast from 'react-native-toast-message'
import { ActivityIndicator } from 'react-native'

// Form validation schema
const loginSchema = yup.object({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = yup.InferType<typeof loginSchema>

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false)
  const [usernameFocused, setUsernameFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const { login, isAuthenticated } = useAuthStore()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)')
    }
  }, [isAuthenticated])

  const onSubmit = async (data: LoginFormData) => {
    try {
      const success = await login(data.username, data.password)
      if (success) {
        Toast.show({
          type: 'success',
          text1: 'Welcome back!',
          text2: 'Successfully logged in',
        })
        router.replace('/(tabs)')
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: 'Invalid credentials',
        })
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred while logging in',
      })
    }
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-primary"
    >
      {/* Header */}
      <View className="bg-primary px-4 pt-16 pb-6 flex justify-center items-center">
        <View className='mt-6 mb-2'>
          <Image
            source={require('../../../assets/images/login-logo.png')}
            className="w-32 h-32"
            resizeMode="contain"
          />
          <Text className="text-white text-3xl font-bold">Attendly</Text>
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 bg-white px-4 mt-16 pt-8 border-t border-gray-200 rounded-t-3xl">
        <Text className="text-2xl font-bold mb-2 text-center">Welcome Back</Text>
        <Text className="text-gray-500 mb-8 text-center">Enter your credentials below</Text>

        {/* Form */}
        <View className="space-y-4">
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, value } }) => (
              <View>
                <Text className="text-sm text-gray-600 mb-2">Username</Text>
                <TextInput
                  className={`w-full h-12 px-4 rounded-lg bg-white ${
                    errors.username 
                      ? 'border-2 border-red-500' 
                      : usernameFocused
                      ? 'border-2 border-primary'
                      : 'border border-gray-200'
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
                  <Text className="text-red-500 text-sm mt-1">{errors.username.message}</Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <View className='mt-4'>
                <Text className="text-sm text-gray-600 mb-2">Password</Text>
                <View className="relative">
                  <TextInput
                    className={`w-full h-12 px-4 rounded-lg bg-white ${
                      errors.password 
                        ? 'border-2 border-red-500'
                        : passwordFocused
                        ? 'border-2 border-primary'
                        : 'border border-gray-200'
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
                    <Text className="text-gray-400 font-medium">{showPassword ? 'Hide' : 'Show'}</Text>
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text className="text-red-500 text-sm mt-1">{errors.password.message}</Text>
                )}
              </View>
            )}
          />

          <TouchableOpacity 
            className={`w-full h-14 bg-primary rounded-lg items-center justify-center mt-16 flex-row ${
              isSubmitting ? 'opacity-70' : ''
            }`}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <ActivityIndicator color="white" className="mr-2" />
                <Text className="text-white font-semibold">Signing in...</Text>
              </>
            ) : (
              <Text className="text-white font-semibold">Login</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
    </KeyboardAvoidingView>
  )
}