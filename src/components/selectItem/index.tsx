import { PropsWithChildren } from "react";
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
  width: 200px;
`;

interface Props<T> {
  label: string;
  instanceId?: string | number;
  value?: PropsValue<T>;
  options?: OptionsOrGroups<T, GroupBase<T>>;
  onChange?: (newValue: SingleValue<T>, actionMeta: ActionMeta<T>) => void;
}

export const SelectItem = <T,>({
  label,
  instanceId,
  value,
  options,
  onChange,
}: PropsWithChildren<Props<T>>) => {
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
