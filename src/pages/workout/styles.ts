import { Box } from "@mui/material";
import styled from "styled-components";

export const Card = styled(Box)`
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 6px;
  padding: 20px;
`;

export const SheetTab = styled(Box)<{ $active?: boolean }>`
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  background: ${p => p.$active ? 'rgba(91,189,44,0.1)' : 'var(--card-bg-deep)'};
  border: 1px solid ${p => p.$active ? 'rgba(198,241,53,0.3)' : 'var(--card-border)'};
  transition: all 0.15s;
  &:hover { border-color: rgba(198,241,53,0.2); }
`;

export const muscleGroupColors: Record<string, string> = {
  'Peitoral': '#00B8D9', 'Tríceps': '#9C6FFF', 'Costas': '#FFB800',
  'Bíceps': '#FF6B35', 'Quadríceps': '#C6F135', 'Isquiotibiais': '#4DFFB4',
  'Panturrilha': '#FF4D9A', 'Ombro': '#FF8C42', 'Glúteo': '#FF6B8A',
  'Abdômen': '#FFD166', 'Trapézio': '#06D6A0', 'Antebraço': '#EF476F',
  'default': '#8A8780',
};