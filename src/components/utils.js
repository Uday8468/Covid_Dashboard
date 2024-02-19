export const getTotalDataOfCovid = async () => {
    try {
        const response = await fetch(
            "https://apis.ccbp.in/covid19-state-wise-data",
            {
                method: "GET"
            }
        );
        const result = await response.json();
        if (response.ok) {
            return result;
        } else {
            return null;
        }
    } catch (err) {
        return null;
    }
};
const indianStates = [
    { state_code: "AN", state_name: "Andaman and Nicobar Islands" },
    { state_code: "AP", state_name: "Andhra Pradesh" },
    { state_code: "AR", state_name: "Arunachal Pradesh" },
    { state_code: "AS", state_name: "Assam" },
    { state_code: "BR", state_name: "Bihar" },
    { state_code: "CH", state_name: "Chandigarh" },
    { state_code: "CT", state_name: "Chhattisgarh" },
    { state_code: "DN", state_name: "Dadra and Nagar Haveli" },
    { state_code: "DD", state_name: "Daman and Diu" },
    { state_code: "DL", state_name: "Delhi" },
    { state_code: "GA", state_name: "Goa" },
    { state_code: "GJ", state_name: "Gujarat" },
    { state_code: "HR", state_name: "Haryana" },
    { state_code: "HP", state_name: "Himachal Pradesh" },
    { state_code: "JK", state_name: "Jammu and Kashmir" },
    { state_code: "JH", state_name: "Jharkhand" },
    { state_code: "KA", state_name: "Karnataka" },
    { state_code: "KL", state_name: "Kerala" },
    { state_code: "LD", state_name: "Lakshadweep" },
    { state_code: "MP", state_name: "Madhya Pradesh" },
    { state_code: "MH", state_name: "Maharashtra" },
    { state_code: "MN", state_name: "Manipur" },
    { state_code: "ML", state_name: "Meghalaya" },
    { state_code: "MZ", state_name: "Mizoram" },
    { state_code: "NL", state_name: "Nagaland" },
    { state_code: "OD", state_name: "Odisha" },
    { state_code: "PY", state_name: "Puducherry" },
    { state_code: "PB", state_name: "Punjab" },
    { state_code: "RJ", state_name: "Rajasthan" },
    { state_code: "SK", state_name: "Sikkim" },
    { state_code: "TN", state_name: "Tamil Nadu" },
    { state_code: "TS", state_name: "Telangana" },
    { state_code: "TR", state_name: "Tripura" },
    { state_code: "UK", state_name: "Uttarakhand" },
    { state_code: "UP", state_name: "Uttar Pradesh" },
    { state_code: "WB", state_name: "West Bengal" },
  ];
  
  
export function convertObjectsDataIntoListItemsUsingForInMethod(data) {
    const resultList = [];
    //getting keys of an object object
    const keyNames = Object.keys(data);
  
    keyNames.forEach((keyName) => {
      //console.log(keyName)
      if (data[keyName]) {
        const { total } = data[keyName];
        //if the state's covid data is available we will store it or we will store 0
        const confirmed = total.confirmed ? total.confirmed : 0;
        const deceased = total.deceased ? total.deceased : 0;
        const recovered = total.recovered ? total.recovered : 0;
        const tested = total.tested ? total.tested : 0;
        const population = data[keyName].meta.population
          ? data[keyName].meta.population
          : 0;
        resultList.push({
          stateCode: keyName,
          name: indianStates.find((state) => state.state_code === keyName)
            ?.state_name,
          confirmed,
          deceased,
          recovered,
          tested,
          population,
          active: confirmed - (deceased + recovered)
        });
      }
    });
    return resultList;
  }