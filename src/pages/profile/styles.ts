import { Box, TextField } from '@mui/material';
import styled from 'styled-components';

export const Card = styled(Box)`
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 6px;
  padding: 24px;
`;

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