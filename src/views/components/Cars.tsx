import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { enterQuery, exitQuery } from "bitecs";
import { Group } from "three";
import { useRef } from "react";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

import { carsQuery as carsQuery } from "../../logic/queries";
import { useWorld } from "../hooks/useWorld";
import { RotationComponent } from "../../logic/components";

const CARS = [
  "ambulance.glb",
  "delivery-flat.glb",
  "delivery.glb",
  "firetruck.glb",
  "garbage-truck.glb",
  "hatchback-sports.glb",
  "police.glb",
  "race-future.glb",
  "race.glb",
  "sedan-sports.glb",
  "sedan.glb",
  "suv-luxury.glb",
  "suv.glb",
  "taxi.glb",
  "tractor-police.glb",
  "tractor-shovel.glb",
  "tractor.glb",
  "truck-flat.glb",
  "truck.glb",
  "van.glb",
];

export function Cars() {
  const cars = useLoader(
    GLTFLoader,
    CARS.map((filename) => "/models/cars/" + filename)
  );

  console.log(cars);

  const world = useWorld();

  const carsRef = useRef<Group>(null);

  useFrame(() => {
    const oldCars = exitQuery(carsQuery)(world);

    carsRef.current?.remove(
      ...carsRef.current.children.filter((mesh) =>
        oldCars.includes(parseInt(mesh.name))
      )
    );

    const newCars = enterQuery(carsQuery)(world).map((eid) => {
      const obj = clone(
        cars.at(Math.floor(Math.random() * cars.length))!.scene
      );
      obj.name = eid.toString();
      obj.scale.set(0.1, 0.1, 0.1);
      obj.position.set(
        Math.floor(Math.random() * 4),
        0,
        Math.floor(Math.random() * 4)
      );
      obj.rotateY((RotationComponent.y[eid] * Math.PI) / 2);

      return obj;
    });

    if (newCars.length > 0) carsRef.current?.add(...newCars);
  });

  return <group ref={carsRef} />;
}

useLoader.preload(
  GLTFLoader,
  CARS.map((filename) => "/models/cars/" + filename)
);
