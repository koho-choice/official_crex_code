import React from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Pricing } from '../components/Pricing';

export function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Pricing />
    </>
  );
}