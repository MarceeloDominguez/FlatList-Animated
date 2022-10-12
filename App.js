import { StatusBar } from "expo-status-bar";
import React from "react";
import { Animated, Dimensions, Image, StyleSheet, View } from "react-native";
import useApi from "./useApi";

const { width } = Dimensions.get("screen");

const imageW = width * 0.7;
const imageH = imageW * 1.54;

const BASE_IMG = "https://image.tmdb.org/t/p";

export default function App() {
  const { data } = useApi();
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={StyleSheet.absoluteFillObject}>
        {data.map((image, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });

          const img = `${BASE_IMG}/w500${image.poster_path}`;

          return (
            <Animated.Image
              key={`image-${index}`}
              source={{ uri: img }}
              style={[StyleSheet.absoluteFillObject, { opacity: opacity }]}
              blurRadius={50}
            />
          );
        })}
      </View>
      <Animated.FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item }) => {
          const img = `${BASE_IMG}/w500${item.poster_path}`;
          return (
            <View style={styles.containerImage}>
              <Image source={{ uri: img }} style={styles.imageMovie} />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  containerImage: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 20,
  },
  imageMovie: {
    width: imageW,
    height: imageH,
    resizeMode: "cover",
    borderRadius: 16,
  },
});
