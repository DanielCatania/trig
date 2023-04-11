import type { IValue, ISides } from "../pages";

export default function calculate(
  sides: ISides,
  setValues: React.Dispatch<React.SetStateAction<IValue>>,
  setSides: React.Dispatch<React.SetStateAction<ISides>>
) {
  // Verificando campos preenchidos
  const completedFields = {
    oppositeSide: sides.oppositeSide !== 0,
    adjacentSide: sides.adjacentSide !== 0,
    hypotenuse: sides.hypotenuse !== 0,
  };
  let filled = 0;
  completedFields.adjacentSide ? (filled += 1) : filled;
  completedFields.oppositeSide ? (filled += 1) : filled;
  completedFields.hypotenuse ? (filled += 1) : filled;
  if (filled < 2) {
    alert("Preencha no mínimo dois campos!");
    return;
  }

  // Se todos os valores estiverem preenchidos
  if (
    completedFields.oppositeSide &&
    completedFields.adjacentSide &&
    completedFields.hypotenuse
  ) {
    setValues({
      sine: sides.oppositeSide / sides.hypotenuse,
      cosine: sides.adjacentSide / sides.hypotenuse,
      tangent: sides.oppositeSide / sides.adjacentSide,
    });
    return;
  }

  // Se a hipotenusa não estiver preenchida
  if (
    completedFields.adjacentSide &&
    completedFields.oppositeSide &&
    !completedFields.hypotenuse
  ) {
    const hypotenuse = Math.sqrt(
      Math.pow(sides.oppositeSide, 2) + Math.pow(sides.adjacentSide, 2)
    );
    setSides({ ...sides, hypotenuse });
    setValues({
      sine: sides.oppositeSide / hypotenuse,
      cosine: sides.adjacentSide / hypotenuse,
      tangent: sides.oppositeSide / sides.adjacentSide,
    });

    return;
  }

  // Se um dos catetos não estiverem preenchidos
  if (
    (completedFields.adjacentSide && completedFields.hypotenuse) ||
    (completedFields.oppositeSide && completedFields.hypotenuse)
  ) {
    const filledSide = completedFields.oppositeSide
      ? sides.oppositeSide
      : sides.adjacentSide;
    const missingSide = Math.sqrt(
      Math.pow(sides.hypotenuse, 2) - Math.pow(filledSide, 2)
    );

    if (completedFields.oppositeSide) {
      setSides({ ...sides, adjacentSide: missingSide });

      setValues({
        sine: sides.oppositeSide / sides.hypotenuse,
        cosine: missingSide / sides.hypotenuse,
        tangent: sides.oppositeSide / missingSide,
      });
    } else {
      setSides({ ...sides, oppositeSide: missingSide });

      setValues({
        sine: missingSide / sides.hypotenuse,
        cosine: sides.adjacentSide / sides.hypotenuse,
        tangent: missingSide / sides.adjacentSide,
      });
    }
  }
}
