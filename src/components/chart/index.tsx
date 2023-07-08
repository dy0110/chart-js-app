import { Cereal } from "@/constants/cereals";
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

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

interface Props {
  cereals: Cereal[];
}

export const Chart: FC<Props> = ({ cereals }) => {
  const items = cereals.map((cereal) => {
    return { x: cereal.calories, y: cereal.carbo };
  });

  return (
    <div style={{ width: "600px" }}>
      <Scatter
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
                text: "Calories",
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
                text: "Carbo",
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
              backgroundColor: "rgb(255, 99, 132)",
              data: items,
            },
          ],
        }}
        width={300}
        height={300}
      />
    </div>
  );
};
