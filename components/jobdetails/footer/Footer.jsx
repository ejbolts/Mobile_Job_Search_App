import React from "react";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { icons } from "../../../constants";
import styles from "./footer.style";
import { storeData, getData } from "../../../app/storageUtils"; // Make sure this path is correct

const Footer = ({ url, jobdata }) => {
  const handleLike = async () => {
    try {
      // Get current liked jobs from storage
      const likedJobs = (await getData("likedJobs")) || [];
      console.log("jobData:", jobdata);

      // Add the current job to the liked jobs array
      likedJobs.push(jobdata);

      // Store the updated liked jobs array back to storage
      await storeData("likedJobs", likedJobs);

      console.log("Job added to liked jobs");
    } catch (e) {
      console.error("Error liking the job:", e);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.likeBtn} onPress={handleLike}>
        <Image
          source={icons.heartOutline}
          resizeMode="contain"
          style={styles.likeBtnImage}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.applyBtn}
        onPress={() =>
          Linking.openURL(
            jobdata?.job_google_link ||
              "https://careers.google.com/jobs/results/"
          )
        }
      >
        <Text style={styles.applyBtnText}>Apply for job</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
