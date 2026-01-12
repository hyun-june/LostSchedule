import { View, Text, Image, StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import CharInfo from "./CharInfo";
import { CharFormProps } from "../../models/charType";
import { theme } from "../../theme/theme";

const CharCard = ({ charProfile, classEngraving }: CharFormProps) => {
  const type = 0;
  const translateX = -25 * type;

  const infoData = [
    { label: "원정대", data: charProfile?.ExpeditionLevel },
    { label: "서버", data: charProfile?.ServerName },
    { label: "칭호", data: charProfile?.Title },
    { label: "길드", data: charProfile?.GuildName },
    { label: "영지", data: charProfile?.TownName },
  ];
  return (
    <View
      style={{
        borderColor: "white",
        borderWidth: 1,
        padding: 5,
      }}
    >
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Image
          source={{
            uri: charProfile?.CharacterImage,
          }}
          style={{
            width: 160,
            height: 160,
            borderRadius: 30,
          }}
        />
        <View style={{ marginLeft: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
              transform: [{ translateX: -5 }],
            }}
          >
            <View style={styles.honorWrapper}>
              <Image
                source={{
                  uri: "https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/game/ico_honor_symbol.png?c90405dbb103c2d03b02",
                }}
                style={[styles.honorImage, { transform: [{ translateX }] }]}
              />
            </View>
            <Text style={{ color: "white", marginRight: 2 }}>명예</Text>
            <Text style={{ color: theme.text.yellow }}>
              {charProfile?.HonorPoint}
            </Text>
          </View>

          <View style={{ gap: 3 }}>
            <Text style={{ color: "white", fontSize: 13, marginBottom: 5 }}>
              LV.{charProfile?.CharacterLevel} {charProfile?.CharacterName}
            </Text>
            <View style={{ marginBottom: 5 }}>
              {infoData?.map(({ label, data }) => {
                return <CharInfo label={label} data={data} key={label} />;
              })}
            </View>

            <View style={styles.iconWrapper}>
              <Entypo name="shield" size={18} color="white" />
              <Text style={{ color: "white", fontSize: 14 }}>
                {charProfile?.ItemAvgLevel}
              </Text>
            </View>
            <View style={styles.iconWrapper}>
              <MaterialCommunityIcons
                name="sword-cross"
                size={18}
                color="white"
              />
              <Text style={{ color: "white", fontSize: 14 }}>
                {charProfile?.CombatPower}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 15, marginLeft: 10 }}>
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          #{charProfile?.CharacterClassName}
        </Text>
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          #{classEngraving}
        </Text>
      </View>
    </View>
  );
};

export default CharCard;

const styles = StyleSheet.create({
  honorWrapper: {
    overflow: "hidden",
    width: 20,
    height: 25,
  },
  honorImage: {
    width: 120,
    height: 25,
  },
  iconWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
