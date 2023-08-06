import { useRouteError } from "react-router-dom";
import { ErrorPage } from "@yoonghan/walcron-microfrontend-shared";

export default function ExtendedErrorPage() {
  const error = useRouteError() as { statusText: string; message: string };

  return <ErrorPage statusText={error.statusText} message={error.message} />;
}
