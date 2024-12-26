import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getCredditById } from "../api/creddit";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useMutation } from "@tanstack/react-query";
import { deleteCreddit , deleteComment} from "../api/creddit";
import { useQueryClient } from "@tanstack/react-query";

const PostDetailsScreen = ({ route }) => {
  const queryClient = useQueryClient();

  const postId = route?.params?.id;
  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ["posts", postId],
    queryFn: () => getCredditById(postId),
  });

  const deletePostMutation = useMutation({
    mutationFn: (postId) => deleteCreddit(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleDelete = (id) => {
    deletePostMutation.mutate(id);
  };

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleDeleteComment = (comment) => {
    console.log("comment", comment);
    deleteCommentMutation.mutate(comment.id );
  };


  const CommentList = data?.comments.map((comment) => (
    <View key={comment.id} style={styles.commentContainer}>
      <Text style={styles.description}>Comment: {comment.comment}</Text>

      <Button 
        title="Delete Comment"
        type="clear"
        onPress={() => handleDeleteComment(comment)}
      />
    </View>
  ))
  return (
    <SafeAreaProvider style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Post Details</Text>
        <View style={styles.textContainer}>
          <Text style={styles.text}> {data?.title}</Text>

          <View style={styles.description}>
          <Text style={styles.descriptionFont}>ID: {data?.id}</Text>
          <Text style={styles.descriptionFont}>Description: {data?.description}</Text>
          </View>

          {CommentList}
</View>
     
          <Button
            title="Delete Post"
            type="clear"
            onPress={() => handleDelete(data)}
          />
       </View>  
    </SafeAreaProvider>
  );
};

export default PostDetailsScreen;

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
    paddingBlock: 35,
    width: 200,
    padding: 10,
    marginTop: 80,
  },

  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "darkGray",
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  
  },
  title: {
    fontSize: 30,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    fontWeight: "bold",
  },
  textContainer: {
    padding: 15,
    alignItems: "center",
    backgroundColor: "lightgray",
    borderRadius: 10,
    width: 300,
    height: 510,
    marginTop: 20,
  },
  description: {
    fontSize: 15,
    color: "black",
    marginBottom: 30,
    justifyContent: "space-between",
  },
  descriptionFont: {
    fontSize: 15,
    fontWeight: "bold",
  },
  commentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    fontSize: 5,
  },

});
