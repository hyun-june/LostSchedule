import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import DropDownPicker, {
  DropDownPickerProps,
} from "react-native-dropdown-picker";
import { useGetRoster } from "../../hooks/useGetCharacter";
import useSearchStore from "../../store/useSearchStore";

interface ItemType {
  label: string;
  value: string;
}

interface Character {
  ServerName: string;
  CharacterName: string;
  CharacterLevel: number;
  CharacterClassName: string;
  ItemAvgLevel: string;
}

const HomeworkDropdown = () => {
  const { myChar } = useSearchStore();
  const [sortData, setSortData] = useState<Character[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string[]>([]);
  const [items, setItems] = useState<ItemType[]>([]);
  const MAX_COUNT = 6;

  // const { data, isLoading } = useGetRoster(myChar);
  const { data, isLoading } = useGetRoster("피엇음");

  const sortByItemLevel = (data: Character[]) =>
    [...data].sort(
      (a, b) =>
        Number(b.ItemAvgLevel.replace(/,/g, "")) -
        Number(a.ItemAvgLevel.replace(/,/g, ""))
    );

  useEffect(() => {
    if (!data?.length) return;

    const sorted = sortByItemLevel(data);
    setSortData(sorted);
  }, [data]);

  useEffect(() => {
    if (!sortData?.length) return;

    const mappedItems: ItemType[] = sortData.map((char) => {
      const level = Number(char.ItemAvgLevel.replace(/,/g, "")).toFixed(0);
      console.log("🚀 ~ HomeworkDropdown ~ level:", level);

      return {
        label: `LV.${level} @${char.CharacterClassName} ${char.CharacterName}`,
        value: `@${char.CharacterName}`,
      };
    });

    setItems(mappedItems);
  }, [sortData]);

  const handleSetValue: DropDownPickerProps<string>["setValue"] = (select) => {
    setValue((prev) => {
      const next = select(prev);

      if (next.length > MAX_COUNT) {
        Alert.alert("최대 6명까지 선택할 수 있어요");
        return prev;
      }
      return next;
    });
  };

  console.log("🚀 ~ HomeworkDropdown ~ items:", items);

  return (
    <View style={styles.box}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={handleSetValue}
        setItems={setItems}
        multiple={true}
        mode="BADGE"
        placeholder="캐릭터를 선택해주세요."
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        textStyle={styles.textStyle}
        listItemContainerStyle={styles.listItemContainer}
        listItemLabelStyle={styles.listItemLabel}
        selectedItemLabelStyle={styles.selectedItemLabel}
        // arrowColor="white"
        arrowIconStyle={{
          width: 20,
          height: 20,
          // tintColor: "white",
        }}
        renderBadgeItem={(item) => (
          <View
            style={{
              backgroundColor: "gray",
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 12,
            }}
          >
            <Text style={{ color: "#fff" }}>{item.value}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default HomeworkDropdown;

const styles = StyleSheet.create({
  box: {
    marginVertical: 30,
    flex: 1,
    padding: 10,
  },
  dropdown: {
    borderColor: "white",
    backgroundColor: "black",
  },
  placeholderStyle: {
    color: "white",
  },
  textStyle: {
    color: "black",
    fontSize: 16,
  },
  listItemContainer: {
    backgroundColor: "black",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  listItemLabel: {
    color: "white",
  },
  selectedItemLabel: {
    color: "#ffc107",
    fontWeight: "bold",
  },
});
