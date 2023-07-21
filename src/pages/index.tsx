import React, { FC } from "react";
import Head from "next/head";
import styled from "styled-components";

import { GetServerSideProps } from "next";

import { Chart } from "@/components/chart";
import { Cereal } from "@/types";

const Section = styled.section`
  padding: 10px;
`;

interface Props {
  cereals: Cereal[];
}

const Home: FC<Props> = ({ cereals }) => {
  return (
    <>
      <Head>
        <title>chart-js-app</title>
        <meta name="description" content="Chart.jsで散布図を表示するアプリ" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Section>
          <h1>chart-js-app</h1>
          <p>シリアルのデータ</p>
          <Chart cereals={cereals} />
        </Section>
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<{
  cereals: Cereal[];
}> = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cereals`,
  );
  const cereals = await response.json();
  return {
    props: { cereals },
  };
};
