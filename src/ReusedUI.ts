import styled from "styled-components/native";

// most basic wrapper to be used on all pages
export const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  padding: 30px;
`;

// good for forms and columns
export const StyledColumnView = styled.View`
  flex-direction: column;
  justify-content: space-evenly;
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const LineBreak = styled.View`
  height: 30px;
  width: 100%;
`;
