import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    try {
        const jsonString = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonString);
    } catch (e) {
        // Handle the error
        console.error("Error storing data:", e);
    }
}

export const getData = async (key) => {
    try {
        const jsonString = await AsyncStorage.getItem(key);
        return jsonString != null ? JSON.parse(jsonString) : null;
    } catch (e) {
        // Handle the error
        console.error("Error fetching data:", e);
        return null;
    }
}

export const removeJobById = async (jobId) => {
    try {
        // Fetch the current list of liked jobs
        const jsonString = await AsyncStorage.getItem('likedJobs');
        const jobs = jsonString != null ? JSON.parse(jsonString) : [];

        // Remove the job with the given jobId
        const updatedJobs = jobs.filter(job => job.job_id !== jobId);

        // Save the updated list of liked jobs
        await AsyncStorage.setItem('likedJobs', JSON.stringify(updatedJobs));

        return updatedJobs; // Return the updated list for UI updates
    } catch (e) {
        // Handle the error
        console.error("Error removing the job by id:", e);
        return null;
    }
}
