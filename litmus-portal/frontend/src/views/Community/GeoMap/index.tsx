import React, { useState } from 'react';
import BinarySwitch from '../../../components/Button/BinarySwitch';
import CityMap from './CityMap';
import CountryMap from './CountryMap';
import useStyles from './styles';

const GeoMap = () => {
  const [showCountry, setShowCountry] = useState<boolean>(true);
  const classes = useStyles();
  return (
    <div className={classes.map}>
      {showCountry ? <CountryMap /> : <CityMap />}
      <br />
      <br />
      <div className={classes.binarySwitch}>
        <BinarySwitch
          handleChange={() => setShowCountry(!showCountry)}
          checked={showCountry}
          leftLabel="City View"
          rightLabel="Country View"
        />
      </div>
    </div>
  );
};
export default GeoMap;
