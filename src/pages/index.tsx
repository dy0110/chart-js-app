import React, { useEffect } from "react";
import Head from "next/head";

import Chart from "chart.js/auto";

export default function Home(props: any) {
  useEffect(() => {
    let myChart: any = null;
    const cereals = props.cereals.map((cereal: any) => {
      return { x: cereal.calories, y: cereal.carbo };
    });
    const config: any = {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "80 Cereals",
            backgroundColor: "rgb(255, 99, 132)",
            data: cereals,
          },
        ],
      },
      options: {
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
              padding: { top: 20, left: 0, right: 0, bottom: 0 },
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
              padding: { top: 20, left: 0, right: 0, bottom: 0 },
            },
          },
        },
      },
    };
    myChart = new Chart(
      document.getElementById("myChart") as HTMLCanvasElement,
      config,
    );
    return () => {
      myChart.destroy();
    };
  }, []);
  return (
    <>
      <Head>
        <title>chart-js-app</title>
        <meta name="description" content="Chart.jsで散布図を表示するアプリ" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section style={{ padding: "10pt" }}>
          <h1>chart-js-app</h1>
          <p>シリアルのデータ</p>
          <div style={{ width: "400pt" }}>
            <canvas id="myChart" width="300" height="300" />
          </div>
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/cereals");
  const cereals = await response.json();
  return {
    props: { cereals },
  };
}
