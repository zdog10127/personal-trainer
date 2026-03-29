import { Box, TextField } from "@mui/material";
import styled, { keyframes } from "styled-components";

export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;
 
export const Wrapper = styled(Box)`
  min-height: 100vh;
  background: var(--bg-default);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
 
  &::before {
    content: '';
    position: absolute;
    width: 600px; height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(198,241,53,0.04) 0%, transparent 70%);
    top: -200px; left: -100px;
    pointer-events: none;
  }
  &::after {
    content: '';
    position: absolute;
    width: 400px; height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,107,53,0.04) 0%, transparent 70%);
    bottom: -100px; right: -100px;
    pointer-events: none;
  }
`;
 
export const Card = styled(Box)`
  width: 100%;
  max-width: 420px;
  background: var(--card-bg);
  border: 1px solid var(--divider);
  border-radius: 8px;
  padding: 48px 40px;
  animation: ${fadeIn} 0.4s ease;
  position: relative;
  z-index: 1;
`;
 
export const LogoMark = styled(Box)`
  width: 48px; height: 48px;
  background: #C6F135;
  display: flex; align-items: center; justify-content: center;
  clip-path: polygon(0 15%, 100% 0, 100% 85%, 0 100%);
  margin-bottom: 24px;
`;
 
export const StyledField = styled(TextField)`
  && {
    .MuiOutlinedInput-root {
      background: var(--input-bg);
      border-radius: 4px;
      color: var(--text-primary);
      font-size: 0.875rem;
 
      fieldset { border-color: var(--card-border-hover); }
      &:hover fieldset { border-color: var(--card-border-strong); }
      &.Mui-focused fieldset { border-color: #C6F135; }
    }
    .MuiInputLabel-root { color: var(--text-secondary); font-size: 0.875rem; }
    .MuiInputLabel-root.Mui-focused { color: #C6F135; }
    .MuiInputAdornment-root svg { color: var(--text-secondary); font-size: 1.1rem; }
  }
`;