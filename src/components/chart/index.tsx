import React, { FC, useEffect, useRef, useState } from "react";
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

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const backgroundColor = "rgb(255, 99, 132)";
const initialScaleX = "calories";
const initialScaleY = "carbo";

interface Props {
  cereals: Cereal[];
}

type ScaleState = {
  scaleX: keyof Cereal;
  scaleY: keyof Cereal;
};

export const Chart: FC<Props> = ({ cereals }) => {
  const initialLoad = useRef(false);
  const chartRef = useRef<
    ChartJS<
      "scatter",
      {
        x: string;
        y: string;
      }[]
    >
  >(null);
  const [scale, setScale] = useState<ScaleState>({
    scaleX: initialScaleX,
    scaleY: initialScaleY,
  });

  const keys = Object.keys(cereals[0])
    .filter((key) => key !== "name" && key !== "type" && key !== "mfr")
    .map((key) => ({ value: key, label: key }));

  useEffect(() => {
    if (!initialLoad.current) {
      initialLoad.current = true;
      return;
    }

    if (!chartRef.current) return;
    const { scaleX, scaleY } = scale;
    const items = cereals.map((cereal) => {
      return { x: cereal[scaleX], y: cereal[scaleY] };
    });

    chartRef.current.data.datasets[0].data = items;
    if (chartRef.current.options.scales?.x?.title) {
      chartRef.current.options.scales.x.title.text = scaleX as string;
    }
    if (chartRef.current.options.scales?.y?.title) {
      chartRef.current.options.scales.y.title.text = scaleY as string;
    }
    chartRef.current.update();
  }, [chartRef, cereals, scale]);

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
              data: cereals.map((cereal) => {
                return { x: cereal.calories, y: cereal.carbo };
              }),
            },
          ],
        }}
        width={300}
        height={300}
      />
    </div>
  );
};
