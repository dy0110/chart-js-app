import React, { FC } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import { SelectItem } from "../selectItem";
import { Cereal } from "@/types";
import {
  initialScaleX,
  initialScaleY,
  useScatterChart,
} from "./hooks/useScatterChart";
import styled from "styled-components";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const backgroundColor = "rgb(255, 99, 132)";

const Root = styled.div`
  width: 600px;
  height: 400px;
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  margin-bottom: 16px;
`;

interface Props {
  cereals: Cereal[];
}

export const Chart: FC<Props> = ({ cereals }) => {
  const { chartRef, keys, initialData, scale, setScale } =
    useScatterChart(cereals);

  return (
    <Root>
      <SelectWrapper>
        <SelectItem
          label="Y軸"
          instanceId="yScale"
          options={keys}
          value={{ label: scale.scaleY, value: scale.scaleY }}
          onChange={(value) => {
            if (!value) return;
            setScale({ ...scale, scaleY: value.value as keyof Cereal });
          }}
        />
        <SelectItem
          label="X軸"
          instanceId="xScale"
          value={{ label: scale.scaleX, value: scale.scaleX }}
          options={keys}
          onChange={(value) => {
            if (!value) return;

            setScale({ ...scale, scaleX: value.value as keyof Cereal });
          }}
        />
      </SelectWrapper>
      <Scatter
        ref={chartRef}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
            },
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: initialScaleX,
                font: {
                  size: 20,
                  weight: "bold",
                  lineHeight: 1.2,
                },
                padding: { top: 20, bottom: 0 },
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: initialScaleY,
                font: {
                  size: 20,
                  weight: "bold",
                  lineHeight: 1.2,
                },
                padding: { top: 20, bottom: 0 },
              },
            },
          },
        }}
        data={{
          datasets: [
            {
              label: "80 Cereals",
              backgroundColor: backgroundColor,
              data: initialData,
            },
          ],
        }}
        width={300}
        height={300}
      />
    </Root>
  );
};
