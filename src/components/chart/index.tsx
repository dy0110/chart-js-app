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
import { Cereal, CerealTypeOption, SearchItemOption } from "@/types";
import {
  initialScaleX,
  initialScaleY,
  useScatterChart,
} from "./hooks/useScatterChart";
import styled from "styled-components";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const backgroundColor = "rgb(255, 99, 132)";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  margin-bottom: 16px;
  width: 280px;
`;

const ChartWrapper = styled.div`
  width: 480px;
  height: 480px;
`;

interface Props {
  cereals: Cereal[];
}

export const Chart: FC<Props> = ({ cereals }) => {
  const { chartRef, graphKeys, typeKeys, mfrKeys, chartData, setChartData } =
    useScatterChart(cereals);

  const { data, scaleX, scaleY, type, mfr } = chartData;

  return (
    <Root>
      <SelectWrapper>
        <h3>1.グラフの軸を選択する</h3>
        <SelectItem<CerealTypeOption>
          label="Y軸"
          instanceId="yScale"
          options={graphKeys}
          value={{ label: scaleY, value: scaleY }}
          onChange={(selectedValue) => {
            if (!selectedValue) return;
            const { value } = selectedValue;
            const valueY = value as keyof Cereal;
            setChartData({
              ...chartData,
              scaleY: valueY,
              data: cereals.map((cereal) => ({
                x: cereal[scaleX],
                y: cereal[valueY],
                type: cereal.type,
                mfr: cereal.mfr,
              })),
            });
          }}
        />
        <SelectItem<CerealTypeOption>
          label="X軸"
          instanceId="xScale"
          value={{ label: scaleX, value: scaleX }}
          options={graphKeys}
          onChange={(selectedValue) => {
            if (!selectedValue) return;
            const { value } = selectedValue;
            const valueX = value as keyof Cereal;
            setChartData({
              ...chartData,
              scaleX: valueX,
              data: cereals.map((cereal) => ({
                x: cereal[valueX],
                y: cereal[scaleY],
                type: cereal.type,
                mfr: cereal.mfr,
              })),
            });
          }}
        />
        <h3>2.表示する値を絞り込む</h3>
        <SelectItem<SearchItemOption>
          label="type"
          instanceId="type"
          options={typeKeys}
          value={{ label: type ?? "選択してください", value: type }}
          onChange={(selectedValue) => {
            if (!selectedValue) return;
            const { value } = selectedValue;
            const mappedData = cereals.map((cereal) => ({
              x: cereal[scaleX],
              y: cereal[scaleY],
              type: cereal.type,
              mfr: cereal.mfr,
            }));

            if (!value && !mfr) {
              setChartData({
                ...chartData,
                type: value,
                data: mappedData,
              });
              return;
            }

            const baseData = mfr
              ? mappedData.filter((item) => item.mfr === mfr)
              : mappedData;

            setChartData({
              ...chartData,
              type: value,
              data: value
                ? baseData.filter((cereal) => cereal.type === value)
                : baseData,
            });
          }}
        />
        <SelectItem<SearchItemOption>
          label="mfr"
          instanceId="mfr"
          options={mfrKeys}
          value={{ label: mfr ?? "選択してください", value: mfr }}
          onChange={(selectedValue) => {
            if (!selectedValue) return;
            const { value } = selectedValue;
            const mappedData = cereals.map((cereal) => ({
              x: cereal[scaleX],
              y: cereal[scaleY],
              type: cereal.type,
              mfr: cereal.mfr,
            }));

            if (!value && !type) {
              setChartData({
                ...chartData,
                type: value,
                data: mappedData,
              });
              return;
            }

            const baseData = type
              ? mappedData.filter((item) => item.type === type)
              : mappedData;

            setChartData({
              ...chartData,
              mfr: value,
              data: value
                ? baseData.filter((cereal) => cereal.mfr === value)
                : baseData,
            });
          }}
        />
      </SelectWrapper>
      <ChartWrapper>
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
                data: data,
              },
            ],
          }}
          width={300}
          height={300}
        />
      </ChartWrapper>
    </Root>
  );
};
