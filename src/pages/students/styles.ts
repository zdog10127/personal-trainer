import { Box } from "@mui/material";
import styled from "styled-components";

export const Card = styled(Box)`
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 6px;
  padding: 20px;
`;

export const GoalColors: Record<string, string> = {
  hipertrofia: '#C6F135', emagrecimento: '#FF6B35',
  condicionamento: '#00B8D9', força: '#FFB800',
};

export const LevelColors: Record<string, string> = {
  iniciante: '#8A8780', intermediário: '#00B8D9', avançado: '#C6F135',
};