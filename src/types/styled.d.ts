// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      accent: string;
      accentTwo: string;
      text: string;
      darkText: string;
    };
  }
}
