import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
    index("routes/home.tsx"),
    route("/unfollow-script", "routes/unfollowScript.tsx"),
    route("slop-score", "routes/slopScore/routes/home.tsx"),
    route("slop-score/analysis/:username", "routes/slopScore/routes/signaltonoise.$username.tsx"),
    route("slop-score/leaderboard", "routes/slopScore/routes/leaderboard.tsx"),
    route("slop-score/calc-logic", "routes/slopScore/routes/calcLogic.tsx"),
] satisfies RouteConfig
