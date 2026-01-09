import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import DropDownPicker, {
  DropDownPickerProps,
} from "react-native-dropdown-picker";
import { CharData } from "../../models/charType";
import useRosterStore from "../../store/useRosterStore";
import Entypo from "@expo/vector-icons/Entypo";
import CustomDropDown from "../CustomDropDown";

interface ItemType {
  label: string;
  value: string;
}

interface HomeworkDropdownProps {
  sortData: CharData[];
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
}

const HomeworkDropdown = ({ sortData, setValue }: HomeworkDropdownProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [items, setItems] = useState<ItemType[]>([]);
  const { roster, setRoster } = useRosterStore();

  useEffect(() => {
    if (!sortData?.length) return;

    const mappedItems: ItemType[] = sortData?.map((char) => {
      const level = Number(char?.ItemAvgLevel.replace(/,/g, ""));

      return {
        label: `LV.${level} @${char.CharacterClassName} ${char.CharacterName}`,
        value: char.CharacterName,
      };
    });

    setItems(mappedItems);
  }, [sortData]);

  const handleSetValue: DropDownPickerProps<string>["setValue"] = (select) => {
    setValue((prev) => {
      const next = select(prev);
      setRoster(next);
      return next;
    });
  };

  return (
    <View style={styles.box}>
      <DropDownPicker
        open={open}
        value={roster}
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
        ArrowDownIconComponent={() => (
          <Entypo name="chevron-down" size={24} color="white" />
        )}
        renderBadgeItem={(props) => {
          const last = roster[roster.length - 1];
          if (props.value !== last) return null;
          const label = items.find((i) => i.value === last)?.label;

          return (
            <View>
              <Text style={styles.textStyle}>{label}</Text>
            </View>
          );
        }}
      />
      <CustomDropDown />
    </View>
  );
};

export default HomeworkDropdown;

const styles = StyleSheet.create({
  box: {
    marginVertical: 30,
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
