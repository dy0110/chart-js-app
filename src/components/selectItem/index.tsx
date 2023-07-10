import { CerealTypeOption } from "@/types";
import { FC } from "react";
import Select, {
  PropsValue,
  OptionsOrGroups,
  GroupBase,
  SingleValue,
  ActionMeta,
} from "react-select";
import styled from "styled-components";

const Root = styled.div`
  display: flex;
  align-items: center;
  column-gap: 4px;
`;

const Label = styled.div`
  font-size: 20px;
`;

const SelectWrapper = styled.div`
  width: 180px;
`;

interface Props {
  label: string;
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
  instanceId,
  value,
  options,
  onChange,
}) => {
  return (
    <Root>
      <Label>{`${label}: `}</Label>
      <SelectWrapper>
        <Select
          instanceId={instanceId}
          value={value}
          options={options}
          onChange={onChange}
        />
      </SelectWrapper>
    </Root>
  );
};
