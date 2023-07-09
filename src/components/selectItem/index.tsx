import { CerealTypeOption } from "@/types";
import { FC } from "react";
import Select, {
  PropsValue,
  OptionsOrGroups,
  GroupBase,
  SingleValue,
  ActionMeta,
} from "react-select";

interface Props {
  label: string;
  htmlFor?: string;
  instanceId?: string | number;
  value?: PropsValue<CerealTypeOption>;
  options?: OptionsOrGroups<CerealTypeOption, GroupBase<CerealTypeOption>>;
  onChange?: (
    newValue: SingleValue<CerealTypeOption>,
    actionMeta: ActionMeta<CerealTypeOption>,
  ) => void;
}

export const SelectItem: FC<Props> = ({
  label,
  htmlFor,
  instanceId,
  value,
  options,
  onChange,
}) => {
  return (
    <>
      <label htmlFor={htmlFor} style={{ marginRight: "4px" }}>
        {label}
      </label>
      <Select
        instanceId={instanceId}
        value={value}
        options={options}
        onChange={onChange}
      />
    </>
  );
};
