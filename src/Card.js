import * as THREE from "three";

class Card {
  constructor({ width, height, radius, color }) {
    const x = width / 2 - radius;
    const y = height / 2 - radius;

    const shape = new THREE.Shape();

    shape
      .absarc(x, y, radius, Math.PI / 2, 0, true)
      .lineTo(x + radius, -y)
      .absarc(x, -y, radius, 0, -Math.PI / 2, true)
      .lineTo(-x, -(y + radius))
      .absarc(-x, -y, radius, -Math.PI / 2, Math.PI, true)
      .lineTo(-(x + radius), y, radius, Math.PI, Math.PI / 2, true)
      .absarc(-x, y, radius, Math.PI, Math.PI / 2, true);

    const squareSize = 2.5;
    const squareX = -squareSize / 2;
    const squareY = -4;

    const squareShape = new THREE.Shape();
    squareShape.moveTo(squareX, squareY);
    squareShape.lineTo(squareX + squareSize, squareY);
    squareShape.lineTo(squareX + squareSize, squareY - squareSize);
    squareShape.lineTo(squareX, squareY - squareSize);
    squareShape.lineTo(squareX, squareY);

    // IC 칩 모델 생성
    const icChipSize = squareSize * 2;
    const icChipX = squareX;
    const icChipY = squareY;

    const icChipGeometry = new THREE.BoxGeometry(icChipSize, icChipSize, 0.02);
    const icChipMaterial = new THREE.MeshStandardMaterial({
      color: 0xc0c0c0,
      roughness: 0.5,
      metalness: 0.5,
    });

    const icChipMesh = new THREE.Mesh(icChipGeometry, icChipMaterial);
    icChipMesh.position.set(icChipX, icChipY, 0.055);

    shape.holes.push(squareShape);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.01,
      bevelThickness: 0.1,
    });

    const material = new THREE.MeshStandardMaterial({
      color,
      side: THREE.DoubleSide,
      roughness: 0.5,
      metalness: 0.5,
    });

    const mesh = new THREE.Mesh(geometry, material);

    mesh.add(icChipMesh);

    this.mesh = mesh;
  }
}

export default Card;
