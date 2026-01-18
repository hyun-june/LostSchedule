import { useRoute } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { useGetCharacter } from "../hooks/useGetCharacter";
import Tab from "../components/Tab";
import { CharRouteProp } from "../models/routeType";
import AppLayout from "../components/Layout/AppLayout";
import CharCard from "../components/CharacterFormComp/CharCard";
import useSearchStore from "../store/useSearchStore";

const Character = () => {
  const { myChar } = useSearchStore();

  const route = useRoute<CharRouteProp>();
  const { searchId } = route.params || {};

  const characterId = searchId || myChar;

  const { data, isLoading, error } = useGetCharacter(characterId);

  if (error) {
    console.error("error", error);
  }

  if (isLoading)
    return (
      <ActivityIndicator
        style={{ top: 150, transform: [{ scale: 2 }] }}
        size="large"
        color="#fff"
      />
    );

  return (
    <AppLayout>
      {data && (
        <CharCard
          charProfile={data?.ArmoryProfile}
          classEngraving={data?.ArkPassive?.Title}
        />
      )}

      <Tab data={data} />
    </AppLayout>
  );
};

export default Character;
