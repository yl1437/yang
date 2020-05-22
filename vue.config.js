// 跨域处理
module.exports= {
    devServer:{
        assetsSubDirectory:'static',
        assetsPublicPath:'/',
        proxy:{
            // '/coreapis' : {
            //     target:'https://uat-channeljf.pubmi.cn',
            //     changeOrigin:true,
            //     pathRewrite:{'^/coreapis':'/'}
            // },
            '/api' : {
                target:'https://uat-operation-gt.pubmi.cn',
                changeOrigin:true,
                pathRewrite:{'^/api':'/'}
            },    
        }
    }
}