import dynamic from "next/dynamic";

const withNoSSR = (Component: React.FunctionComponent) => dynamic(() => Promise.resolve(Component), { ssr: false });

export { withNoSSR };
