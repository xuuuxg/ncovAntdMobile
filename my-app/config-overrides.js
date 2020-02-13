const {injectBabelPlugin} = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
 
module.exports = function override(config, env) {
    config = injectBabelPlugin(
        ['import',
            {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: true
            }, 'ant'
        ],
        config
    );

    config = injectBabelPlugin(
        ['import',
            {
                libraryName: "antd-mobile",
                libraryDirectory: 'lib',
                style: true
            }, 'ant-mobile'
        ],
        config
    );

    config = rewireLess.withLoaderOptions({
        modifyVars: {"@primary-color": "#4197FC"},
        javascriptEnabled: true,
    })(config, env);

    return config;
};