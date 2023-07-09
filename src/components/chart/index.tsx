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

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const backgroundColor = "rgb(255, 99, 132)";

interface Props {
  cereals: Cereal[];
}

export const Chart: FC<Props> = ({ cereals }) => {
  const { chartRef, keys, initialData, scale, setScale } =
    useScatterChart(cereals);

  return (
    <div style={{ width: "600px", height: "400px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          columnGap: "16px",
          marginBottom: "16px",
        }}
      >
        <div>
          <SelectItem
            htmlFor="yScale"
            label="y軸"
            instanceId="yScale"
            options={keys}
            value={{ label: scale.scaleY, value: scale.scaleY }}
            onChange={(value) => {
              if (!value) return;
              setScale({ ...scale, scaleY: value.value as keyof Cereal });
            }}
          />
        </div>
        <div>
          <SelectItem
            htmlFor="xScale"
            label="x軸"
            instanceId="xScale"
            value={{ label: scale.scaleX, value: scale.scaleX }}
            options={keys}
            onChange={(value) => {
              if (!value) return;

              setScale({ ...scale, scaleX: value.value as keyof Cereal });
            }}
          />
        </div>
      </div>
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
    </div>
  );
};
