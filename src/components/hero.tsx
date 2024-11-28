import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import colors from '@/ui/colors'; // Update with your actual colors file path

interface HeroProps {
  title: string;
  subtitle: string;
  buttonText: string;
  onPress: () => void;
  imageSource: any; // Update type as needed for your image handling
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  buttonText,
  onPress,
  imageSource,
}) => {
  return (
    <View style={styles.container}>
      {/* Hero Image */}
      <Image
        source={{ uri: imageSource }}
        style={styles.heroImage}
        contentFit="cover"
      />

      {/* Overlay Text */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        {/* Call-to-Action Button */}
        <TouchableOpacity style={styles.ctaButton} onPress={onPress}>
          <Text style={styles.ctaText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 500, // or whatever specific height you want
    backgroundColor: colors.neutral[50],
  },
  heroImage: {
    width: '100%',
    height: 250, // or whatever specific height you want
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary.light,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary.dark,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: colors.secondary.dark,
    textAlign: 'center',
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: colors.primary.main,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.neutral[50],
    textAlign: 'center',
  },
});

export default Hero;
