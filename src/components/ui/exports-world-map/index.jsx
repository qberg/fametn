import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "/world-continents.json";

const ExportsWorldMap = () => {
  return (
    <div data-aos="fade-up">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{
          scale: 170,
        }}
        viewBox="0 60 800 450"
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                stroke="#ffffff"
                style={{
                  default: {
                    fill: "#D0D9E5",
                    outline: "none",
                  },
                  hover: {
                    fill: "#F7D88C",
                    outline: "none",
                    stroke: "#171717",
                    strokeWidth: 0.5,
                  },
                  pressed: {
                    fill: "#EEB118",
                    outline: "none",
                    stroke: "#171717",
                    strokeWidth: 0.75,
                  },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default ExportsWorldMap;
