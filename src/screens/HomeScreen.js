import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchData, deletePost } from "../api/creddit";
import { useNavigation } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

const HomeScreen = () => {
  const navigation = useNavigation();

  const queryClient = useQueryClient();
  const { data, isFetching, isSuccess, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchData,
    enabled: true,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return (
    <SafeAreaProvider style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Posts</Text>
        <View style={styles.postContainer}>
          {data?.map((post) => (
            <Button
              key={post.id}
              title={post.title}
              type="clear"
              titleStyle={styles.text}
              onPress={() =>
                navigation.navigate("PostDetailsScreen", {
                  id: post.id,
                  title: post.title,
                })
              }
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
   

          <Button
            title="Add Post"
            onPress={() => {
              navigation.navigate("AddPostsScreen");
            }}
          />
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "lightgray",
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 40,
    backgroundColor: "white",
    borderRadius: 40,
    marginTop: 70,
    marginLeft: 21,
    marginBottom: 55,
    marginRight: 21,
    backgroundColor: "white",
    height: 500,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.8,
    shadowRadius: 8.8,
    elevation: 10,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: 200,
    paddingBlock: 35,
    width: 200,
  },

  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: 200,
    paddingBlock: 57,
    width: 200,
    padding: 10,
    marginTop: 150,
    marginBottom: 400,
  },

  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "gray",
  },
  title: {
    fontSize: 30,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    fontWeight: "bold",
  },
  postContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: 200,
    paddingBlock: 20,
    width: 200,
  },
});
