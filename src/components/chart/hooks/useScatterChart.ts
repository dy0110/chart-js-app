import { useEffect, useRef, useState } from "react";
import { Chart as ChartJS } from "chart.js";
import { Cereal } from "@/types";

export const initialScaleX = "calories";
export const initialScaleY = "carbo";

type ScaleState = {
  scaleX: keyof Cereal;
  scaleY: keyof Cereal;
};

export const useScatterChart = (cereals: Cereal[]) => {
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

  const initialData = cereals.map((cereal) => {
    return { x: cereal.calories, y: cereal.carbo };
  });

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

  return {
    chartRef,
    keys,
    initialData,
    scale,
    setScale,
  };
};
