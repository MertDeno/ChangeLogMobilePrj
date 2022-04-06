import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Platform,
  FlatList,
} from "react-native";
import { CheckBox, SearchBar } from "react-native-elements";
function PlantsPage() {
  const [filteredData, setFilteredData] = useState([]);
  const [plantData, setPlantData] = useState([]);
  const [selectData, setSelectData] = useState([]);

  const [checkedPlant, setCheckedPlant] = useState();
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  var baseURL =
    Platform.OS === "android"
      ? "http://10.0.2.2:8000/EtWerksSet"
      : process.env.LINK + "/EtWerksSet";

  const handleOnChange = (plant) => {
    plantData.forEach((item) => {
      if (plant === item.Werks) {
        item.checked = !item.checked;
      } else {
        return item.checked;
      }
    });
    setCheckedPlant(plantData.filter((item) => item.checked));
    setSelectData(plantData.filter((item) => item.checked));
    setFilteredData(plantData);
  };
  const ListViewType = ({ item, index }) => {
    return (
      // Flat List Item
      <CheckBox
        containerStyle={styles.flatListItem}
        onPress={() => {
          handleOnChange(item.Werks);
        }}
        title={item.Werks + " - " + item.Name1}
        checked={item.checked}
      />
    );
  };
  const fetchApi = async () => {
    try {
      const plantRes = await axios.get(baseURL);
      setFilteredData(
        plantRes.data.map((data) => ({ ...data, checked: false }))
      );
      setPlantData(plantRes.data.map((data) => ({ ...data, checked: false })));
      setSelectData(plantData);
      /*setIsLoading(true)
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)*/
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);
  const updateSearch = (search) => {
    if (search === "") {
      console.log("null");
      setIsCheckedAll(false);
      setFilteredData(plantData);
      setSelectData(filteredData);
    } else {
      setSearch(search);
      const newData = plantData.filter((item) => {
        return (
          item.Werks.includes(search.toUpperCase()) ||
          item.Name1.includes(search.toUpperCase())
        );
      });
      setFilteredData(newData);
      setSelectData(filteredData);
    }
  };
  const handleSelectAll = () => {
    isCheckedAll === false
      ? filteredData.map((item) => {
          if (isCheckedAll === true) {
            if (item.checked === true) {
              item.checked = !item.checked;
              setIsCheckedAll(false);
            }
          } else {
            if (item.checked === false) {
              item.checked = !item.checked;
              setIsCheckedAll(true);
            }
          }
        })
      : filteredData.map((item) => {
          if (isCheckedAll === true) {
            if (item.checked === true) {
              item.checked = !item.checked;
              setIsCheckedAll(false);
            }
          } else {
            if (item.checked === false) {
              item.checked = !item.checked;
              setIsCheckedAll(true);
            }
          }
        });

    setCheckedPlant(plantData.filter((item) => item.checked));
    setSelectData(filteredData);
  };
  return (
    <View flex={1}>
      <SearchBar
        value={search}
        placeholder=" Search..."
        lightTheme
        round
        onChangeText={updateSearch}
        inputStyle={{ backgroundColor: "#fff", borderRadius: 15 }}
        containerStyle={{ backgroundColor: "rgb(247,247,247)" }}
        inputContainerStyle={{ backgroundColor: "rgb(247,247,247)" }}
      />
      <CheckBox
        title={"Select All"}
        onPress={handleSelectAll}
        checked={isCheckedAll}
        containerStyle={styles.flatListItem}
      />
      {isLoading ? (
        <View
          style={{ flex: 3, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <FlatList
          data={filteredData}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => "key" + index}
          renderItem={ListViewType}
        ></FlatList>
      )}
    </View>
  );
}

export default PlantsPage;
const styles = StyleSheet.create({
  flatListItem: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    margin: 5,
  },
});
