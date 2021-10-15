import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";

const CountrySelector = () => {
  const [selected, setSelected] = useState("");
  const onSelect = (code) => setSelected(code);

  const showSelectedLabel = ("Show Selected Label", true);
  const showSecondarySelectedLabel = (
    "Show Secondary Selected Label",
    true
  );
  const selectedSize = ("Selected Size", 16);
  const showOptionLabel = ("Show Option Label", true);
  const showSecondaryOptionLabel = ("Show Secondary Option Label", true);
  const optionsSize = ("Options Size", 16);
  const placeholder = ("Placeholder", "");
  const searchable = ("Searchable", true);
  const searchPlaceholder = ("Search Placeholder", "");
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
      {selected}
    </div>
  );
};

export default CountrySelector;
