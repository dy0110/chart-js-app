import { useEffect, useRef, useState } from "react";
import { Cereal } from "@/types";
import { Chart as ChartJS } from "chart.js";

export const initialScaleX = "calories";
export const initialScaleY = "carbo";

export interface ChartData {
  x: string;
  y: string;
  type: string;
  mfr: string;
  name: string;
}

interface ChartState {
  scaleX: keyof Cereal;
  scaleY: keyof Cereal;
  type: string | null;
  mfr: string | null;
  data: ChartData[];
}

export const initialKeyItem = { value: null, label: "選択してください" };

export const useScatterChart = (cereals: Cereal[]) => {
  const chartRef = useRef<ChartJS<"scatter", ChartData[]>>(null);
  const [chartData, setChartData] = useState<ChartState>(() => {
    const initialData = cereals.map((cereal) => ({
      x: cereal.calories,
      y: cereal.carbo,
      type: cereal.type,
      mfr: cereal.mfr,
      name: cereal.name,
    }));

    return {
      scaleX: initialScaleX,
      scaleY: initialScaleY,
      type: null,
      mfr: null,
      data: initialData,
    };
  });

  const graphKeys = Object.keys(cereals[0])
    .filter((key) => key !== "name" && key !== "type" && key !== "mfr")
    .map((key) => ({ value: key, label: key }));

  const typeKeys = Array.from(
    new Set(cereals.map((cereal) => cereal.type)),
  ).map((key) => ({ value: key, label: key }));

  const mfrKeys = Array.from(new Set(cereals.map((cereal) => cereal.mfr))).map(
    (key) => ({ value: key, label: key }),
  );

  useEffect(() => {
    if (!chartRef.current) return;
    const { scaleX, scaleY, data } = chartData;

    chartRef.current.data.datasets[0].data = data;
    if (chartRef.current.options.scales?.x?.title) {
      chartRef.current.options.scales.x.title.text = scaleX as string;
    }
    if (chartRef.current.options.scales?.y?.title) {
      chartRef.current.options.scales.y.title.text = scaleY as string;
    }
    chartRef.current.update();
  }, [chartRef, cereals, chartData]);

  return {
    chartRef,
    graphKeys,
    typeKeys: [initialKeyItem, ...typeKeys],
    mfrKeys: [initialKeyItem, ...mfrKeys],
    chartData,
    setChartData,
  };
};
