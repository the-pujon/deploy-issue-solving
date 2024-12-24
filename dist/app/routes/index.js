"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../module/user/user.route");
const auth_route_1 = require("../module/auth/auth.route");
const group_route_1 = require("../module/group/group.route");
const message_route_1 = require("../module/message/message.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: user_route_1.userRoute,
    },
    {
        path: '/auth',
        route: auth_route_1.authRoute,
    },
    {
        path: '/group',
        route: group_route_1.groupRoute,
    },
    {
        path: '/message',
        route: message_route_1.messageRoute,
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
