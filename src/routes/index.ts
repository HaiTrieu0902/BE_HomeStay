import routeAuth from './auth.role';
import routeCategory from './category.route';
import routeRole from './role.route';
import routeRoom from './room.route';
import routeUser from './user.route';

function route(app: any) {
    app.use('/api/role', routeRole);
    app.use('/api/user', routeUser);
    app.use('/api/auth', routeAuth);
    app.use('/api/category', routeCategory);
    app.use('/api/room', routeRoom);
}
export default route;
