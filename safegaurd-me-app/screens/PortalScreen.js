import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native'
import WebView from 'react-native-webview';

const PortalScreen = ({route}) => {
  const { accessToken } = route.params
  const [portalUrl, setPortalUrl] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    const fetchPortalUrl = async () => {
        const response = await axios.get('https://safeguard-me-coding-exercise.azurewebsites.net/api/PortalUrl', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setPortalUrl(response.data);
    };
    fetchPortalUrl();
  }, [accessToken]);

  const handleNavigationStateChange = (newNavState) => {
    if (newNavState.url === 'https://safeguard-me-coding-exercise.azurewebsites.net/api/PortalSuccess') {
      setUploadSuccess(true);
    }
  };


  return (
    <View style={styles.container}>
      {uploadSuccess ? (
        <Text style={styles.successMessage}> Success Message !!</Text>
      ) : (
        <WebView source={{ uri: portalUrl }} onNavigationStateChange={handleNavigationStateChange} />
      )}
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default PortalScreen