import api, { ApiOptions, buildRoute } from "@/lib/axios";

export const authBaseRoute = "";

const authApis = {
  post: ({ route, payload, config }: ApiOptions = {}) =>
    api.post(buildRoute(authBaseRoute, route), payload, config),
};

export default authApis;
