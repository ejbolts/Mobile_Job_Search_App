import { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";
import {
    Nearbyjobs,
    Popularjobs,
    ScreenHeaderBtn,
    Welcome,
} from "../components";

const Home = () => {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState("");
    const [activeJobType, setActiveJobType] = useState("FULLTIME");
    const [activeJobLocation, setActiveJobLocation] = useState("AU");
    const handleLikePress = () => {
        router.push(`/liked-jobs-list`);

    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' handlePress={handleLikePress} />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn iconUrl={images.profile} dimension='100%' />
                    ),
                    headerTitle: "",
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flex: 1,
                        padding: SIZES.medium,
                    }}
                >
                    <Welcome
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleClick={() => {
                            if (searchTerm) {
                                router.push(`/search/${searchTerm} ${activeJobType} ${activeJobLocation}`)
                            }
                        }}
                        activeJobType={activeJobType}
                        setActiveJobType={setActiveJobType}
                        activeJobLocation={activeJobLocation}
                        setActiveJobLocation={setActiveJobLocation}
                    />

                    <Popularjobs />
                    <Nearbyjobs activeJobType={activeJobType} activeJobLocation={activeJobLocation} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};



export default Home;