import React from "react";
import { Cards, Chart, CountryPicker } from "./components";
import { fetchData } from "./api";
import styles from "./App.module.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      country: "",
    };
  }

  async componentDidMount() {
    this.setState({ data: await fetchData() });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  };

  render() {
    return (
      <div className={styles.container}>
        <Cards dataFromAPI={this.state.data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart
          dataFromAppjs={this.state.data}
          countryFromAppjs={this.state.country}
        />
      </div>
    );
  }
}

export default App;
