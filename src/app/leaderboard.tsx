import LeaderBoard from "@/view/leaderboard";
import { ScrollView } from "react-native";

const leaderBoardPage = () => {
  return (
    <ScrollView 
      contentContainerStyle={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <LeaderBoard />
    </ScrollView>
  );
};

export default leaderBoardPage;
