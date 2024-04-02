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

export const getFAQList = async () => {
  try {
    const response = await fetch(
      "https://apis.ccbp.in/covid19-faqs",
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
}

export const getTimeLinesOfState = async (stateCode) => {
  try {
    const response = await fetch(
      `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`,
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
}
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
      const updatedAt = data[keyName].meta.last_updated
      resultList.push({
        stateCode: keyName,
        name: indianStates.find((state) => state.state_code === keyName)
          ?.state_name,
        confirmed,
        deceased,
        recovered,
        tested,
        population,
        updatedAt,
        active: confirmed - (deceased + recovered)
      });
    }
  });
  return resultList;
}

export const convertObjectsToListForGraph = (data) => {
  let datesList = [];
  let districtList = [];
  const keyNames = Object.keys(data);

  let mainObj = data[keyNames[0]];

  const { dates, districts } = mainObj;
  let arr = Object.entries(mainObj)
  datesList.push({ ...dates })
  districtList.push({ ...districts })
  let deceased = 0;
  let confirmed = 0;
  let recovered = 0;
  let tested = 0;
  let active = 0

  let totalData = datesList.map((each) => {
    let keys = Object.keys(each)
    keys.map((eachData) => {
      let totalObj = each[eachData]?.total
      let activeExp = totalObj?.confirmed - (totalObj?.deceased + totalObj?.recovered)
      confirmed = confirmed + totalObj?.confirmed
      active = active + activeExp
      recovered = recovered + totalObj?.recovered
      deceased = deceased + totalObj?.deceased
      tested = tested + totalObj?.tested
    })
    return { confirmed,active,recovered,deceased,tested }

  })

  deceased = 0
  confirmed = 0;
  recovered = 0;
  tested = 0;
  active = 0

  let districtTotal = districtList.map((each) => {
    let keys = Object.keys(each)
    let newArray = keys.map((eachData) => {
      let totalObj = each[eachData]?.dates
      let listOfDates = Object.keys(totalObj)
      
      listOfDates.map((value) => {
        let totalCount = totalObj[value]?.total
        let activeExp = totalCount?.confirmed - (totalCount?.deceased + totalCount?.recovered)
        confirmed = confirmed + totalCount?.confirmed
        active = active + activeExp
        recovered = recovered + totalCount?.recovered
        deceased = deceased + totalCount?.deceased
        tested = tested + totalCount?.tested
      })
      return {[eachData]:{confirmed,active,recovered,deceased,tested}}

    })
    return newArray
    // each = districtList
    // re
  })

  return {totalData,districtTotal}



  // return {datesList,districtList}


}

export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const options = {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}