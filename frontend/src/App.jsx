import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import HomePage from "./page/HomePage"
import SignUpPage from "./page/SignUpPage"
import ChatPage from "./page/ChatPage"
import LoginPage from "./page/LoginPage"
import Notification from "./page/Notification"
import CallPage from "./page/CallPage"
import OnBoardingPage from "./page/OnBoarding"
import EditProfilePage from "./components/profileEditpage.jsx" 
import toast, { Toaster } from "react-hot-toast"
import PageLoader from './components/PageLoader.jsx'
import useAuthUser from './lib/hooks/useAuthUser.js'
import Layout from './components/Layout.jsx'
import { useThemeStore } from './store/useThemeStore.js'

const App = () => {
  const { isLoading, authUser } = useAuthUser()
  const { theme } = useThemeStore()
  const isAuthenticated = Boolean(authUser)
  const isOnboarded = authUser?.isOnboarded

  if (isLoading) return <PageLoader />

  return (
    <div className='h-screen' data-theme={theme}>
      <Routes>
        <Route
          path='/'
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path='/signup'
          element={
            !isAuthenticated ? (
              <SignUpPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />

        <Route
          path='/chat/:id'
          element={
            isAuthenticated && isOnboarded ? (
              <Layout>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path='/login'
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />

        <Route
          path='/notifications'
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <Notification />
              </Layout>
            ) : (
              <Navigate to={isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path='/call/:id'
          element={
            isAuthenticated && isOnboarded ? (
              <CallPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path='/onboarding'
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnBoardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />


        <Route
          path='/profile/edit'
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <EditProfilePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
