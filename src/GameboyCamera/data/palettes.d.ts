declare module "palettes.json" {
  type palette = {
    name: string;
    black: string;
    dark_gray: string;
    light_gray: string;
    white: string;
  };
  const value: palette[];
  export default value;
}
