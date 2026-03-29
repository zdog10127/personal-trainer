import { TextField } from '@mui/material';
import styled from 'styled-components';

export const StyledField = styled(TextField)`
  && {
    .MuiOutlinedInput-root {
      background: var(--input-bg);
      color: var(--text-primary);
      font-size: 0.875rem;
      fieldset { border-color: var(--card-border-hover); }
      &:hover fieldset { border-color: var(--card-border-strong); }
      &.Mui-focused fieldset { border-color: #C6F135; }
    }
    .MuiInputLabel-root { color: var(--text-secondary); font-size: 0.875rem; }
    .MuiInputLabel-root.Mui-focused { color: #C6F135; }
  }
`;

export const WEEK_DAYS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
export const MUSCLE_GROUPS = [
  'Peitoral', 'Costas', 'Ombro', 'Bíceps', 'Tríceps', 'Antebraço',
  'Quadríceps', 'Isquiotibiais', 'Glúteo', 'Panturrilha', 'Abdômen', 'Trapézio',
];