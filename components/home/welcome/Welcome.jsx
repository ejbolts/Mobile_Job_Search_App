import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants";

const jobTypes = ["FULLTIME", "PARTTIME", "CONTRACTOR"];
const jobLocation = ["AU", "US", "JP", "UK", "CA", "NZ", "SG"];

const Welcome = ({
  searchTerm,
  setSearchTerm,
  handleClick,
  activeJobType,
  setActiveJobType,
  activeJobLocation,
  setActiveJobLocation,
}) => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder="What are you looking for?"
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          style={styles.tabsContainer}
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />

        <FlatList
          data={jobLocation}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobLocation, item)}
              onPress={() => {
                setActiveJobLocation(item);
              }}
            >
              <Text style={styles.tabText(activeJobLocation, item)}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
