
import { colour, space, font } from '../styles/theme'

export const sourceCode = props => `
  font-family: ${font.code};
  line-height: 1.2em;
  font-size: ${font.base};
  background-color: transparent;
  padding: ${space.m};
  width: calc(100% - ${space.m} - ${space.m});
  height: calc(100% - ${space.m} - ${space.m});
  border: none;
  caret-color: ${colour.white};
  color: ${colour.white};
  resize: none;
  overflow-y: scroll;
  white-space: pre-wrap;
  word-break: keep-all;

  &:focus {
    outline: none;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar {
    width: ${space.xs};
    height: ${space.xs};
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: ${space.xs};
    background-color: ${colour.blue};
  }
`