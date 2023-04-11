"use client";
import React, { useState } from "react";
import calculate from "../src/calculate";

export interface ISides {
  oppositeSide: number;
  adjacentSide: number;
  hypotenuse: number;
}

export interface IValue {
  sine: number
  cosine: number
  tangent: number
}

export default function Home() {
  const [sides, setSides] = useState<ISides>({
    adjacentSide: 0,
    oppositeSide: 0,
    hypotenuse: 0,
  });
  const [values, setValues] = useState<IValue>({
    cosine: 0,
    sine: 0,
    tangent: 0,
  });

  return (
    <main>
      <form>
        <label>
          <span>Cateto Adjacente:</span>
          <input
            type="number"
            value={sides.adjacentSide}
            min={0}
            onChange={(e) =>
              setSides({ ...sides, adjacentSide: parseFloat(e.target.value) ||0 })
            }
          />
        </label>
        <label>
          <span>Cateto Oposto:</span>
          <input
            type="number"
            value={sides.oppositeSide}
            min={0}
            onChange={(e) =>
              setSides({ ...sides, oppositeSide: parseFloat(e.target.value) ||0 })
            }
          />
        </label>
        <label>
          <span>Hipotenusa:</span>
          <input
            type="number"
            value={sides.hypotenuse}
            min={0}
            onChange={(e) =>
              setSides({ ...sides, hypotenuse: parseFloat(e.target.value) ||0 })
            }
          />
        </label>
        <button
          type="button"
          onClick={() => calculate(sides, setValues, setSides)}
        >
          Calcular
        </button>
      </form>
      <p>
        <span>Seno:</span> {values.sine}
      </p>
      <p>
        <span>Cosseno:</span> {values.cosine}
      </p>
      <p>
        <span>Tangente:</span> {values.tangent}
      </p>
    </main>
  );
}

