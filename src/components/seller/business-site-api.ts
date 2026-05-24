import api, { ApiOptions, buildRoute } from "@/lib/axios";

export const businessSiteBaseRoute = "/business-site";

const businessSiteApis = {
  get: ({ route, params, config }: ApiOptions = {}) =>
    api.get(buildRoute(businessSiteBaseRoute, route), { params, ...config }),

  getById: (id: string, config?: any) =>
    api.get(`${businessSiteBaseRoute}/${id}`, config),

  post: ({ route, payload, config }: ApiOptions = {}) =>
    api.post(buildRoute(businessSiteBaseRoute, route), payload, config),

  put: ({ route, payload, config }: ApiOptions = {}) =>
    api.put(buildRoute(businessSiteBaseRoute, route), payload, config),

  patch: ({ route, payload, config }: ApiOptions = {}) =>
    api.patch(buildRoute(businessSiteBaseRoute, route), payload, config),

  delete: ({ route, config }: ApiOptions = {}) =>
    api.delete(buildRoute(businessSiteBaseRoute, route), config),
};

export default businessSiteApis;
