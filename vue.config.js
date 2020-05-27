// 跨域处理
module.exports= {
    devServer:{
        // assetsSubDirectory:'static',
        // assetsPublicPath:'/',
        proxy:{
            '/api' : {
                target:'https://uat-operation-gt.pubmi.cn',
                changeOrigin:true,
                pathRewrite:{'^/api':'/'}
            },   
            '/cores' : {
                target:'https://uat-channeljf.pubmi.cn',
                changeOrigin:true,
                pathRewrite:{'/cores':'/'}
            }, 
        }
    }
}