import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Platform,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  TextInput,
} from "react-native";
import { Button, CheckBox, Icon, SearchBar } from "react-native-elements";

function MaterialNumberPage(props) {
  const [filteredData, setFilteredData] = useState([]);
  const [matNumberData, setMatNumberData] = useState([]);
  const [checkedMatNumber, setcheckedMatNumber] = useState();
  const [search, setSearch] = useState();

  const [selectedOption1, setSelectedOption1] = useState("include");
  const [selectedOption2, setSelectedOption2] = useState("contains");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [rangeValues, setRangeValues] = useState({
    rangeMin: "",
    rangeMax: "",
  });
/*   const [isShowRanged, setShowRanged] = useState(false);
  const [isClosed, setIsClosed] = useState(false); */

  var baseURL =
    Platform.OS === "android"
      ? "http://10.0.2.2:8000/EtMaterialsSet"
      : process.env.LINK + "/EtMaterialsSet";

  const handleRangeChange = (range, value) => {
    setRangeValues({
      ...rangeValues,
      [range]: value,
    });
  };

  const fetchApi = async () => {
    try {
      const matnrRes = await axios.get(baseURL);

      setMatNumberData(
        matnrRes.data.map((data) => ({ ...data, checked: false }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const updateSearch = (search) => {
    if (search) {
      if (selectedOption2 === "contains") {
        setSearch(search);
        const newData = matNumberData.filter((item) => {
          return item.Matnr.includes(search.toUpperCase());
        });
        setFilteredData(newData);
      } 
      else if (selectedOption2 === "et") {
        setSearch(search);
        const newData = matNumberData.filter((item) => {
          return item.Matnr === search.toUpperCase();
        });
        setFilteredData(newData);
      } 
      else if (selectedOption2 === "between") {
        console.log("between");
      } 
      else if (selectedOption2 === "sw") {
        setSearch(search);
        const newData = matNumberData.filter((item) => {
          return item.Matnr.substring(0, search.length) === search;
        });
        setFilteredData(newData);
      } 
      else if (selectedOption2 === "ew") {
        setSearch(search);
        const newData = matNumberData.filter((item) => {
          return (
            item.Matnr.substring(
              item.Matnr.length - search.length,
              item.Matnr.length
            ) === search
          );
        });
        setFilteredData(newData);
      } 
      else if (selectedOption2 === "lt") {
        setSearch(search);
        const newData = matNumberData.filter((item) => {
          return Number(item.Matnr) < Number(search);
        });
        setFilteredData(newData);
      } 
      else if (selectedOption2 === "ltet") {
        setSearch(search);
        const newData = matNumberData.filter((item) => {
          return Number(item.Matnr) <= Number(search);
        });
        setFilteredData(newData);
      } 
      else if (selectedOption2 === "gt") {
        setSearch(search);
        const newData = matNumberData.filter((item) => {
          return Number(item.Matnr) > Number(search);
        });
        setFilteredData(newData);
      } 
      else if (selectedOption2 === "gtet") {
        setSearch(search);
        const newData = matNumberData.filter((item) => {
          return Number(item.Matnr) >= Number(search);
        });
      } 
      else if (selectedOption2 === "empty") {
        const newData = matNumberData.filter((item) => {
          return item.Matnr === null;
        });
        setFilteredData(newData);
      }

      setcheckedMatNumber(filteredData);
    } 
    
    else {
      setcheckedMatNumber("");
    }
  };

  const selectFilter = () => {
    if (selectedOption2 === "between")
      return (
        <View style={{ display: "flex", flexDirection: "row" }}>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Min."
            value={rangeValues.rangeMin}
            onChangeText={(rangeMinVal) =>
              handleRangeChange("rangeMin", rangeMinVal)
            }
          />
          <Text
            style={{
              flex: 1,
              textAlign: "center",
              justifyContent: "center",
              alignSelf: "center",
            }}/>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Max."
            value={rangeValues.rangeMax}
            onChangeText={(rangeMaxVal) =>
              handleRangeChange("rangeMax", rangeMaxVal)
            }
          />
          {/* {setSelectedFilters(rangeMin)} */}
          {console.log(rangeValues.rangeMin + " - " + rangeValues.rangeMax)}
          <TouchableOpacity
            round
            style={{
              marginTop: 5,
              marginHorizontal: 5,
              alignSelf: "center",
              flex: 3,
            }}
            onPress={() =>
              setSelectedFilters(
                ...selectedFilters,
                rangeValues.rangeMin + " - " + rangeValues.rangeMax
              )
            }>

            <Text
              style={{
                color: "white",
                backgroundColor: "rgb(53,74,95)",
                borderRadius: 10,
                textAlign: "center",
                textAlignVertical: "center",
                padding: 3,
              }}>
                Add Filter
            </Text>
          </TouchableOpacity>
        </View>
      );
    else if (selectedOption2 === "empty") {
      return (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            round
            onPress={() => setSelectedFilters((selectedFilters) => ["Empty"])}
            style={{
              marginVertical: 5,
              marginHorizontal: 5,
              alignSelf: "center",
              flex: 1,
            }}>
              <Text
                style={{
                  color: "white",
                  backgroundColor: "rgb(53,74,95)",
                  borderRadius: 10,
                  textAlign: "center",
                  textAlignVertical: "center",
                  padding: 3,
                }}>
                Add Filter
              </Text>
          </TouchableOpacity>
        </View>
      );
    } 
    else {
      return (
        <View style={{ flexDirection: "row" }}>
          <SearchBar
            value={search}
            placeholder=" Search..."
            lightTheme
            round
            onChangeText={updateSearch}
            inputStyle={{ backgroundColor: "#fff", borderRadius: 15 }}
            containerStyle={{
              backgroundColor: "rgb(247,247,247)",
              flex: 6,
              borderRadius: 15,
              margin: 3,
            }}
            inputContainerStyle={{ backgroundColor: "rgb(247,247,247)" }}
            style={{ flex: 6 }}
          />
          <TouchableOpacity
            round
            style={{
              marginTop: 5,
              marginHorizontal: 5,
              alignSelf: "center",
              flex: 1,
            }}
            onPress={() =>
              setSelectedFilters(
                search
                  ? selectedFilters
                    ? selectedFilters.includes(search)
                      ? () => [...selectedFilters]
                      : (selectedFilters) => [
                          ...selectedFilters,
                          " " + search + " - " + selectedOption2,
                        ]
                    : () => [search]
                  : () => []
              )
            }>
            <Text
              style={{
                color: "white",
                backgroundColor: "rgb(53,74,95)",
                borderRadius: 10,
                textAlign: "center",
                textAlignVertical: "center",
                padding: 3,
              }}>
                Add Filter
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        <Picker
          style={{ flex: 1 }}
          selectedValue={selectedOption1}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedOption1(itemValue)}>
          <Picker.Item label="Include" value={"include"} />
          <Picker.Item label="Exclude" value={"exclude"} />
        </Picker>

        <Picker
          style={{ flex: 2 }}
          selectedValue={selectedOption2}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedOption2(itemValue)}>
          <Picker.Item label="contains" value={"contains"} />
          <Picker.Item label="equal to" value={"et"} />
          <Picker.Item label="between" value={"between"} />
          <Picker.Item label="starts with" value={"sw"} />
          <Picker.Item label="ends with" value={"ew"} />
          <Picker.Item label="less than" value={"lt"} />
          <Picker.Item label="less than or equal to" value={"ltet"} />
          <Picker.Item label="greater than" value={"gt"} />
          <Picker.Item label="greater than or equal to" value={"gtet"} />
          <Picker.Item label="empty" value={"empty"} />
        </Picker>
      </View>

      {selectFilter()}
      <View style={{ flexDirection: "row", marginHorizontal: 3 }}>
        {selectedFilters
          ? selectedFilters.map((item, index) => {
              return (
                <View
                  style={{
                    marginHorizontal: 2,
                    flexDirection: "row",
                    padding:10,
                    backgroundColor: "rgb(53,74,95)",
                    borderRadius: 15,
                  }}>
                  <Text
                    style={{
                      color: "white",
                      marginHorizontal: 1,
                      textAlignVertical: "center",
                    }}>
                    {item}
                  </Text>
                  <TouchableOpacity
                    style={{
                      display: "flex",
                      alignItems: "center",
                      borderRadius: 15,
                    }}>
                    <Icon name="close" color={"white"} size={20} />
                  </TouchableOpacity>
                </View>
              );
            })
          : console.log("EMPTY")}
      </View>
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
  textInputStyle: {
    flex: 4,
    height: 35,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});
