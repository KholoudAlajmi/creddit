import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { createCreddit } from "../api/creddit";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";


const AddPostsScreen = ({route}) => {

  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

 

  const createPostMutation = useMutation({
    mutationFn: (newPost) => createCreddit(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"]});
    },
  });


  const handleSubmit = () => {
    createPostMutation.mutate({
      title,
      description,
    });
  };

console.log("title", title);
console.log("description", description);


  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Add New Post</Text>

        <TextInput
          placeholder="Title"
          value={title}
          style={styles.input}
          onChangeText={setTitle}
        />

        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />

        <Button
          title="Add"
          onPress={handleSubmit}
          loading={createPostMutation.isLoading}
          disabled={createPostMutation.isLoading}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddPostsScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "lightgray",
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 30,
    backgroundColor: "white",
    borderRadius: 40,
    marginTop: 10,
    marginLeft: 21,
    marginBottom: 10,
    marginRight: 21,
    backgroundColor: "white",
    height: 635,
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
    padding: 10,
    marginTop: 50,
  },

  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "gray",
    paddingTop: 8,
  },
  title: {
    fontSize: 30,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 55,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
  },
});
