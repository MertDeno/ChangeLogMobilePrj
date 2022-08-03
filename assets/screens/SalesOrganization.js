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

function MaterialNumberPage(props) {
  const [filteredData, setFilteredData] = useState([]);
  const [salesOrgData, setSalesOrgData] = useState([]);
  const [selectData, setSelectData] = useState([]);

  const [checkedSalesOrg, setcheckedSalesOrg] = useState();
  const [isCheckedAll, setIsCheckedAll] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  var baseURL =
    Platform.OS === "android"
      ? "http://10.0.2.2:8000/EtVkorgSet"
      : process.env.LINK + "/EtVkorgSet";

  const handleOnChange = (sorg) => {
    salesOrgData.forEach((item) => {
      if (sorg === item.Vkorg) {
        item.checked = !item.checked;
      } else {
        return item.checked;
      }
    });
    setcheckedSalesOrg(salesOrgData.filter((item) => item.checked));
    setFilteredData(salesOrgData);
    setSelectData(filteredData);
  };
  const ListViewType = ({ item, index }) => {
    return (
      // Flat List Item
      <CheckBox
        containerStyle={styles.flatListItem}
        onPress={() => {
          handleOnChange(item.Vkorg);
        }}
        title={item.Vkorg + " - " + item.Vtext}
        checked={item.checked}
      />
    );
  };
  const fetchApi = async () => {
    try {
      const sorgRes = await axios.get(baseURL);
      setFilteredData(
        sorgRes.data.map((data) => ({ ...data, checked: false }))
      );
      setSalesOrgData(
        sorgRes.data.map((data) => ({ ...data, checked: false }))
      );
      setSelectData(salesOrgData);
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
    setSearch(search);
    const newData = salesOrgData.filter((item) => {
      return item.Vkorg.includes(search.toUpperCase());
    });
    setFilteredData(newData);
    setSelectData(filteredData);
  };
  const handleSelectAll = () => {
    filteredData.map((item) => {
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

    setcheckedSalesOrg(salesOrgData.filter((item) => item.checked));
    setFilteredData(salesOrgData);
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

export default MaterialNumberPage;
const styles = StyleSheet.create({
  flatListItem: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    margin: 5,
  },
});
