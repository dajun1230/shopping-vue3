import router from './routes';

const whiteList = ['/login']; // 无需令牌白名单

router.beforeEach((to, from, next) => {
	// 获取令牌判断用户是否登陆
  const hasToken = sessionStorage.getItem('token');
  
  // 已登陆
  if (hasToken) {
  	if (to.path === '/login') {
    	// 若已登陆没有必要显示登陆页，重定向至首页
      next('/');
    } else {
      // 是否获取过角色信息
      // const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      
      // if (hasRoles) {
      	// 说明用户已获取角色信息，放行
        next();
      // } else {
      // 	try {
      //   	// 先请求获取用户信息
      //     const { roles } = await store.dispatch('user/getInfo');
          
      //     // 根据当前用户角色过滤出可访问路由
      //     const accessRoutes = await store.dispatch('permission/generateRole');
          
      //     // 添加至路由器
      //     router.addRoutes(accessRoutes)
          
      //     // 继续路由切换，确保addRoutes完成
      //     next({ ...to, replace: true });
      //   } catch(error) {
      //   	// 出错需重制令牌并重新登陆（令牌过期、网络错误等原因）
      //     await store.dispatch('user/resetToken');
      //     next(`/login?redirect=${to.path}`)
      //     alert(error || '未知错误')
      //   }
      // }
    }
  } else {
  	// 未登陆
    if (whiteList.indexOf(to.path) !== -1) {
    	// 白名单中路由放过
      next();
    } else {
    	// 重定向至登陆页
      next(`/login?redirect=${to.path}`);
    }
  }
});


export default router;
