import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useState } from "react";
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { deleteComment } from '../api/creddit';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { createComment } from '../api/creddit';



const AddCommentsScreen = ({route}) => {

  const queryClient = useQueryClient();


  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState("");


  const createCommentMutation = useMutation({
    mutationFn: (addComment) => createComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", postId]});
    },
  });

  const handleSubmit = () => {
    createCommentMutation.mutate({
      comment,
    });
  };

console.log("comment", comment);
console.log("commentId", commentId);






  const postId = route?.params?.id;

  const { data, isLoading, error } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostById(postId),
});






const deleteCommentMutation = useMutation({
  mutationFn: (commentId) => deleteComment(postId, commentId),
  onSuccess: () => {
      queryClient.invalidateQueries(['posts', postId]);
  }
});

const handleDelete = (id) => {
  deleteCommentMutation.mutate(id);
};  


  

    return (
<SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Add or Delete Comment</Text>

        <TextInput
          style={styles.input}
          placeholder="ID"
          value={postId}
          onChangeText={() => setComment({ ...comment , postId: postId })}
        /> 
          <TextInput
          style={styles.input}
          placeholder="Comment"
          value={comment.comment}
          onChangeText={(text) => setComment({ ...comment, comment: text })}
        />  


      <Button
          title="Add"
          onPress={handleSubmit}
          loading={createCommentMutation.isLoading}
          disabled={createCommentMutation.isLoading}
        />

      

<Button 
style={styles.button}
          title="delete"
          onPress={handleDelete}
          loading={deleteCommentMutation.isLoading}
          disabled={deleteCommentMutation.isLoading}
        />

  
      </View>
    </SafeAreaView>
    )
}

export default AddCommentsScreen;

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
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,

  },

})


// import { View, Text, StyleSheet, TextInput, Button } from "react-native";
// import { createCreddit } from "../api/creddit";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useMutation } from "@tanstack/react-query";
// import React, { useState } from "react";
// import { useQueryClient } from "@tanstack/react-query";


// const AddPostsScreen = ({route}) => {

//   const queryClient = useQueryClient();

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

 
//   const postId = route?.params?.id;

//   const createPostMutation = useMutation({
//     queryKey: ["listPosts", postId],
//     mutationFn: (postId) => createCreddit(postId),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["listPosts"]});
//     },
//   });

//   // const createPostMutation = useMutation({
//   //   mutationKey: ["listPosts"],
//   //   mutationFn: () => createCreddit(newPost),
//   //   enabled: true,
//   //   onSuccess: () => {
//   //     queryClient.invalidateQueries({ queryKey: ["listPosts"] });
//   //   },
//   // });

//   // const handleSubmit = (id) => {
//   //   createPostMutation.mutate(id);
//   // };

//   const handleSubmit = (id) => {
//     createPostMutation.mutate({
//       title,
//       description,
//     });
//   };

// console.log("title", title);
// console.log("description", description);


//   return (
//     <SafeAreaView style={styles.background}>
//       <View style={styles.container}>
//         <Text style={styles.title}>Add New Post</Text>

//         <TextInput
//           placeholder="Title"
//           value={title}
//           style={styles.input}
//           onChangeText={setTitle}
//         />

//         <TextInput
//           style={styles.input}
//           placeholder="Description"
//           value={description}
//           onChangeText={setDescription}
//         />

//         <Button
//           title="Add"
//           onPress={handleSubmit}
//           loading={createPostMutation.isLoading}
//           disabled={createPostMutation.isLoading}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default AddPostsScreen;

