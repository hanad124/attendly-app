import LeaderBoard from "@/view/leaderboard";
import { View } from "react-native";

const leaderBoardPage = () => {
  return (
    <View 
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <LeaderBoard />
    </View>
  );
};

export default leaderBoardPage;
