import { Box } from "@mui/material";
import styled from "styled-components";

export const Card = styled(Box)`
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 6px;
  padding: 20px;
`;

export const StatCard = styled(Card)`
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, #C6F135, transparent);
  }
`;

export const GoalBadge: Record<string, { label: string; color: string }> = {
  hipertrofia:    { label: 'Hipertrofia',    color: '#C6F135' },
  emagrecimento:  { label: 'Emagrecimento',  color: '#FF6B35' },
  condicionamento:{ label: 'Condicionamento',color: '#00B8D9' },
  força:          { label: 'Força',          color: '#FFB800' },
};

export const LevelColors: Record<string, string> = {
  iniciante: '#8A8780', intermediário: '#00B8D9', avançado: '#C6F135',
};