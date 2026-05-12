import api, { ApiOptions, buildRoute } from "@/lib/axios";

export const accountBaseRoute = "/account";

const accountApis = {
  get: ({ route, params, config }: ApiOptions = {}) =>
    api.get(buildRoute(accountBaseRoute, route), { params, ...config }),

  getById: (id: string, config?: any) =>
    api.get(`${accountBaseRoute}/${id}`, config),

  post: ({ route, payload, config }: ApiOptions = {}) =>
    api.post(buildRoute(accountBaseRoute, route), payload, config),

  put: ({ route, payload, config }: ApiOptions = {}) =>
    api.put(buildRoute(accountBaseRoute, route), payload, config),

  patch: ({ route, payload, config }: ApiOptions = {}) =>
    api.patch(buildRoute(accountBaseRoute, route), payload, config),

  delete: ({ route, config }: ApiOptions = {}) =>
    api.delete(buildRoute(accountBaseRoute, route), config),
};

export default accountApis;
