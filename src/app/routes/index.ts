import { Router } from "express";
import { userRoute } from "../module/user/user.route";
import { authRoute } from "../module/auth/auth.route";
import { groupRoute } from "../module/group/group.route";
import { messageRoute } from "../module/message/message.route";

const router = Router();

const moduleRoutes = [

    { 
        path: '/auth',
        route: userRoute,
    },
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/group',
        route: groupRoute,
    },
    {
        path: '/message',
        route: messageRoute,
    }

]

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;