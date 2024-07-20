import { createFileRoute } from "@tanstack/react-router";
import { Game } from "../views/components/Game";

export const Route = createFileRoute("/")({
  component: Game,
});
