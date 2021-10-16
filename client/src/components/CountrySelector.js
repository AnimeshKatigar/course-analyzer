import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import "../styles/CountryPicker.css";

const CountrySelector = ({selected, onSelect}) => {
  // const [selected, setSelected] = useState("");
  // const onSelect = (code) => setSelected(code);

  const showSelectedLabel = ("Show Selected Label", true);
  const showSecondarySelectedLabel = ("Show Secondary Selected Label", true);
  const selectedSize = ("Selected Size", 16);
  const showOptionLabel = ("Show Option Label", true);
  const showSecondaryOptionLabel = ("Show Secondary Option Label", true);
  const optionsSize = ("Options Size", 16);
  const placeholder = ("Placeholder", "Select language");
  const searchable = ("Searchable", true);
  const searchPlaceholder = ("Search Placeholder", "Search");
  const alignOptionsToRight = ("Align Options to Right", false);
  const fullWidth = ("Full Width", true);
  const disabled = ("Disabled", false);

  return (
    <div className="demo-wrapper">
      <ReactFlagsSelect
        selected={selected}
        onSelect={onSelect}
        showSelectedLabel={showSelectedLabel}
        showSecondarySelectedLabel={showSecondarySelectedLabel}
        selectedSize={selectedSize}
        countries={[
          "US",
          "FR",
          "DE",
          "IT",
          "BR",
          "IN",
          "CN",
          "TR",
          "KR",
          "ES",
          "CL",
          "JP",
          "MX",
          "PT",
          "PL",
          "RO",
          "NL",
        ]}
        customLabels={{
          US: "English",
          FR: "French",
          DE: "German",
          IT: "Italian",
          BR: "Brazilian",
          IN: "Hindi",
          CN: "Chinese",
          TR: "Turkey",
          KR: "Korean",
          ES: "Spanish",
          CL: "Chilean",
          JP: "Japanese",
          MX: "Mexican",
          PT: "Portuguese",
          PL: "Polish",
          RO: "Romansh",
          NL: "Dutch",
        }}
        showOptionLabel={showOptionLabel}
        showSecondaryOptionLabel={showSecondaryOptionLabel}
        optionsSize={optionsSize}
        placeholder={placeholder}
        searchable={searchable}
        searchPlaceholder={searchPlaceholder}
        alignOptionsToRight={alignOptionsToRight}
        fullWidth={fullWidth}
        disabled={disabled}
      />
      {/* {selected} */}
    </div>
  );
};

export default CountrySelector;
