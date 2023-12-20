import React, { useState } from "react";
import AsyncSelect from "react-select/async";

export default function TubeFinder({
  userOptions,
  dateOptions,
  loadUserOptions,
  loadDateOptions,
  handleUserSelectChange,
  handleDateSelectChange,
  userStation,
  dateStation,
}) {
  return (
    <>
      <h2>Enter your nearest station</h2>
      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions={loadUserOptions}
        onChange={handleUserSelectChange}
        options={userOptions}
        placeholder="User's station..."
      />
      <h2>Enter your dates nearest station</h2>
      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions={loadDateOptions}
        onChange={handleDateSelectChange}
        options={dateOptions}
        placeholder="Date's station..."
      />
    </>
  );
}
