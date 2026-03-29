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
      &.Mui-focused fieldset { border-color: var(--accent); }
    }
    .MuiInputLabel-root { color: var(--text-secondary); font-size: 0.875rem; }
    .MuiInputLabel-root.Mui-focused { color: var(--accent); }
    .MuiSelect-icon { color: var(--text-secondary); }
    .MuiMenuItem-root { font-size: 0.875rem; }
  }
`;