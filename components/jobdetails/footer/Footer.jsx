import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { COLORS, icons } from "../../../constants";
import styles from "./footer.style";
import { storeData, getData } from "../../../app/storageUtils";
import Modal from "react-native-modal";

const Footer = ({ url, jobdata }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false); // default to false

  useEffect(() => {
    const checkIfJobIsLiked = async () => {
      try {
        const likedJobs = (await getData("likedJobs")) || [];
        const jobAlreadyLiked =
          jobdata &&
          jobdata.job_id &&
          likedJobs.some((job) => job.job_id === jobdata.job_id);

        console.log("Job already liked:", jobAlreadyLiked);
        setIsLiked(jobAlreadyLiked);
      } catch (e) {
        console.error("Error in checkIfJobIsLiked:", e);
      }
    };

    checkIfJobIsLiked();
  }, [jobdata]);

  const handleLike = async () => {
    try {
      // Get current liked jobs from storage
      const likedJobs = (await getData("likedJobs")) || [];

      const jobAlreadyLiked = likedJobs.some(
        (job) => job.job_id === jobdata.job_id
      );
      if (!jobAlreadyLiked) {
        likedJobs.push(jobdata);
        await storeData("likedJobs", likedJobs);
        // Change the state to indicate that the job is now liked
        setIsLiked(true);
        // Show modal when a job is newly liked
        showModal();
      } else {
        // If job is already liked, remove it from the storage and the state
        const updatedJobs = likedJobs.filter(
          (job) => job.job_id !== jobdata.job_id
        );
        await storeData("likedJobs", updatedJobs);

        setIsLiked(false);
      }
    } catch (e) {
      console.error("Error handling the job like status:", e);
    }
  };

  const showModal = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.likeBtn,
          isLiked ? { backgroundColor: COLORS.secondary } : {},
        ]}
        onPress={handleLike}
      >
        <Image
          source={icons.heartOutline}
          resizeMode="contain"
          style={[
            styles.likeBtnImage,
            isLiked ? { tintColor: COLORS.white } : {},
          ]}
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

      <Modal
        isVisible={isVisible}
        style={{
          justifyContent: "flex-end",
          margin: 90,
        }}
        backdropOpacity={0.3}
      >
        <View
          style={{
            backgroundColor: COLORS.secondary,
            padding: 20,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.applyBtnText}>Job Liked!</Text>
        </View>
      </Modal>
    </View>
  );
};

export default Footer;
