import { Select, SelectProps } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { FilterFunc } from "rc-select/lib/Select";
import React, { FC } from "react";

interface Props<T> extends SelectProps {
  data: T[];
  valueKey?: string;
  labelKey?: string;
  filterOption?: boolean | FilterFunc<DefaultOptionType>;
}
function SelectBuilder<T>({
  data,
  valueKey = "_id",
  labelKey = "name",
  filterOption,
  ...rest
}: Props<T>) {
  return (
    <Select
      {...rest}
      showSearch
      filterOption={
        filterOption ||
        ((input, option) =>
          (option?.[labelKey] ?? "")
            .toLowerCase()
            .includes(input.toLowerCase()))
      }
      options={data?.map((v) => ({
        ...v,
        value: v?.[valueKey],
        label: v?.[labelKey],
      }))}
    >
      {data?.map((v) => (
        <Select.Option value={v?.[valueKey]}>{v?.[labelKey]}</Select.Option>
      ))}
    </Select>
  );
}

export default SelectBuilder;
