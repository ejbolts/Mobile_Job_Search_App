import { useState } from "react";
import { Stack, useRouter } from "expo-router";

import { View, Text, TouchableOpacity, ActivityIndicator, SafeAreaView } from "react-native";



import styles from "../../Mobile_Job_search_App/components/home/nearby/nearbyjobs.style.js";
import { COLORS, SIZES, icons, images } from "../../Mobile_Job_search_App/constants";
import testData from "./test-data.json";
import { NearbyJobCard, ScreenHeaderBtn } from '../components'
import { ScrollView } from "react-native-gesture-handler";
export default function likedJobsList() {
    let [likedJobsArray, setLikedJobsArray] = useState(testData.data);
    const router = useRouter();
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
                    <TouchableOpacity>
                        <Text style={styles.headerBtn}>Show all</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    {
                        likedJobsArray?.map((job) => (

                            <View style={{ height: 100, paddingBottom: 13 }}>
                                <NearbyJobCard
                                    job={job}
                                    key={`nearby-job-${job.job_id}`}
                                    handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
                                    activeJobType={"FULLTIME"}
                                    activeJobLocation={"US"}
                                />
                            </View>

                        ))
                    }
                </ScrollView>
            </View>

        </SafeAreaView>
    );
};
