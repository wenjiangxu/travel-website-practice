(function() {
    const backtotop = document.getElementById('backtotop');
    let isScrolling = false;
    
    // 使用 RAF 和 easing 函数实现更平滑的滚动
    function smoothScroll() {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const easing = currentScroll / 6;
        
        if (currentScroll > 0 && !isScrolling) {
            isScrolling = true;
            window.requestAnimationFrame(() => {
                window.scrollTo({
                    top: currentScroll - easing,
                    behavior: 'auto'
                });
                isScrolling = false;
                if (currentScroll > easing) {
                    smoothScroll();
                }
            });
        }
    }
    
    // 使用节流函数优化滚动监听
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // 点击返回顶部
    backtotop.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScroll();
    });
    
    // 控制按钮显示/隐藏
    window.addEventListener('scroll', throttle(() => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        
        // 当滚动超过一屏高度时显示按钮
        if (scrollTop > window.innerHeight) {
            backtotop.classList.add('show');
        } else {
            backtotop.classList.remove('show');
        }
    }, 100));
})();