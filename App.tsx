import React from 'react'
import Navigation from './src/navigation'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import i18n from './i18n.config'
import localeES from './src/i18n/es'

export default function App() {
  i18n.addResourceBundle('es', 'App', localeES)

  return (
    <SafeAreaProvider>
      <StatusBar />
      <Navigation />
    </SafeAreaProvider>
  )
}
