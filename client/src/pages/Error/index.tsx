interface ErrorPops {
  error?: unknown;
}

export const ErrorPage = ({ error }: ErrorPops) => {
  console.error(error);
  return <h1>Oops, Something went wrong</h1>;
};
