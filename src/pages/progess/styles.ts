import { Box } from "@mui/material";
import styled from "styled-components";

export const Card = styled(Box)`
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 6px;
  padding: 20px;
`;

export const measurementLabels: Record<string, { label: string; unit: string; color: string }> = {
  weight:  { label: 'Peso',            unit: 'kg', color: '#C6F135' },
  bodyFat: { label: 'Gordura Corporal', unit: '%',  color: '#FF6B35' },
  chest:   { label: 'Peitoral',        unit: 'cm', color: '#00B8D9' },
  waist:   { label: 'Cintura',         unit: 'cm', color: '#FFB800' },
  hip:     { label: 'Quadril',         unit: 'cm', color: '#9C6FFF' },
  thigh:   { label: 'Coxa',            unit: 'cm', color: '#FF4D9A' },
  arm:     { label: 'Braço',           unit: 'cm', color: '#4DFFB4' },
};