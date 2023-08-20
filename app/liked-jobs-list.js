import { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";

import { View, Text, TouchableOpacity, ActivityIndicator, SafeAreaView } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../../Mobile_Job_search_App/components/home/nearby/nearbyjobs.style.js";
import { COLORS, SIZES, icons, images } from "../../Mobile_Job_search_App/constants";
import testData from "./test-data.json";
import { NearbyJobCard, ScreenHeaderBtn } from '../components'
import { ScrollView } from "react-native-gesture-handler";

import { storeData, getData, removeJobById } from './storageUtils';


export default function likedJobsList() {
    const [likedJobs, setLikedJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const clearStorage = async () => {
        try {
            await AsyncStorage.clear();
            console.log('Storage successfully cleared!');
            setLikedJobs([]); // Clear the local state
        } catch (error) {
            console.error('Error clearing storage:', error);
        }
    };
    useEffect(() => {
        fetchLikedJobs();
    }, []);

    const fetchLikedJobs = async () => {
        try {
            const retrievedJobs = await getData('likedJobs');
            if (retrievedJobs) {
                console.log('retrievedJobs', retrievedJobs);
                setLikedJobs(retrievedJobs);
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching liked jobs:', error);
            setIsLoading(false);
        }
    };

    const router = useRouter();

    const handleJobDeletion = async (jobId) => {
        const updatedJobs = await removeJobById(jobId);
        setLikedJobs(updatedJobs || []);
    }
    if (isLoading) {
        return <ActivityIndicator size="large" color={COLORS.primary} />;
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,

                    headerRight: () => (
                        <ScreenHeaderBtn iconUrl={images.profile} dimension='100%' />
                    ),
                    headerTitle: "",
                }}
            />
            <View
                style={{
                    flex: 1,
                    padding: SIZES.medium,
                }}
            >
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Liked jobs </Text>
                    <TouchableOpacity onPress={clearStorage}>
                        <Text style={styles.headerBtn}>Clear all</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        likedJobs.map((job) => (
                            <View key={`nearby-job-wrapper-${job.job_id}`} style={{ height: 100, paddingBottom: 13 }}>
                                <NearbyJobCard
                                    job={job}
                                    key={`nearby-job-${job.job_id}`}
                                    handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
                                    activeJobType={"FULLTIME"}
                                    activeJobLocation={"AU"}
                                />
                                <TouchableOpacity onPress={() => handleJobDeletion(job.job_id)}>
                                    <Text style={styles.headerBtn}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </ScrollView>
            </View>

        </SafeAreaView>
    );
};
