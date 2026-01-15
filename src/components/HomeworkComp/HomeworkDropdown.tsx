import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { CharData } from "../../models/charType";
import CustomDropDown from "../CustomDropDown";

interface ItemType {
  label: string;
  value: string;
}

interface HomeworkDropdownProps {
  sortData: CharData[];
}

const HomeworkDropdown = ({ sortData }: HomeworkDropdownProps) => {
  const [items, setItems] = useState<ItemType[]>([]);

  useEffect(() => {
    if (!sortData?.length) return;

    const mappedItems: ItemType[] = sortData?.map((char) => {
      const level = Number(char?.ItemAvgLevel?.replace(/,/g, ""));

      return {
        label: `LV.${level} @${char.CharacterClassName} ${char.CharacterName}`,
        value: char.CharacterName,
      };
    });

    setItems(mappedItems);
  }, [sortData]);

  return (
    <View style={styles.box}>
      <CustomDropDown list={items} />
    </View>
  );
};

export default HomeworkDropdown;

const styles = StyleSheet.create({
  box: {
    marginTop: 30,
    marginBottom: 20,
  },
  dropdown: {
    borderColor: "white",
    backgroundColor: "black",
  },
  placeholderStyle: {
    color: "white",
  },
  textStyle: {
    color: "white",
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
