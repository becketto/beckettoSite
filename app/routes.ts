import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
    index("routes/home.tsx"),
    route("/unfollow-script", "routes/unfollowScript.tsx")
] satisfies RouteConfig
