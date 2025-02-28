"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderingService = void 0;

var _react = _interopRequireDefault(require("react"));

var _server = require("react-dom/server");

var _operators = require("rxjs/operators");

var _i18n = require("@osd/i18n");

var _https = require("https");

var _axios = _interopRequireDefault(require("axios"));

var _http = _interopRequireDefault(require("axios/lib/adapters/http"));

var _views = require("./views");

var _ssl_config = require("../http/ssl_config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const DEFAULT_TITLE = 'OpenSearch Dashboards';
/** @internal */

class RenderingService {
  constructor(coreContext) {
    this.coreContext = coreContext;

    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "httpsAgent", void 0);

    _defineProperty(this, "assignBrandingConfig", async (darkMode, opensearchDashboardsConfig) => {
      const brandingValidation = await this.checkBrandingValid(darkMode, opensearchDashboardsConfig);
      const branding = opensearchDashboardsConfig.branding; // assign default mode URL based on the brandingValidation function result

      const logoDefault = brandingValidation.isLogoDefaultValid ? branding.logo.defaultUrl : undefined;
      const markDefault = brandingValidation.isMarkDefaultValid ? branding.mark.defaultUrl : undefined;
      const loadingLogoDefault = brandingValidation.isLoadingLogoDefaultValid ? branding.loadingLogo.defaultUrl : undefined; // assign dark mode URLs based on brandingValidation function result

      let logoDarkmode = brandingValidation.isLogoDarkmodeValid ? branding.logo.darkModeUrl : undefined;
      let markDarkmode = brandingValidation.isMarkDarkmodeValid ? branding.mark.darkModeUrl : undefined;
      let loadingLogoDarkmode = brandingValidation.isLoadingLogoDarkmodeValid ? branding.loadingLogo.darkModeUrl : undefined;
      /**
       * For dark mode URLs, we added another validation:
       * user can only provide a dark mode URL after providing a valid default mode URL,
       * If user provides a valid dark mode URL but fails to provide a valid default mode URL,
       * return undefined for the dark mode URL
       */

      if (logoDarkmode && !logoDefault) {
        this.logger.get('branding').error('Must provide a valid logo default mode URL before providing a logo dark mode URL');
        logoDarkmode = undefined;
      }

      if (markDarkmode && !markDefault) {
        this.logger.get('branding').error('Must provide a valid mark default mode URL before providing a mark dark mode URL');
        markDarkmode = undefined;
      }

      if (loadingLogoDarkmode && !loadingLogoDefault) {
        this.logger.get('branding').error('Must provide a valid loading logo default mode URL before providing a loading logo dark mode URL');
        loadingLogoDarkmode = undefined;
      } // assign favicon based on brandingValidation function result


      const favicon = brandingValidation.isFaviconValid ? branding.faviconUrl : undefined; // assign application title based on brandingValidation function result

      const applicationTitle = brandingValidation.isTitleValid ? branding.applicationTitle : DEFAULT_TITLE; // use expanded menu by default unless explicitly set to false

      const {
        useExpandedHeader = true
      } = branding;
      const brandingAssignment = {
        logoDefault,
        logoDarkmode,
        markDefault,
        markDarkmode,
        loadingLogoDefault,
        loadingLogoDarkmode,
        favicon,
        applicationTitle,
        useExpandedHeader
      };
      return brandingAssignment;
    });

    _defineProperty(this, "checkBrandingValid", async (darkMode, opensearchDashboardsConfig) => {
      const branding = opensearchDashboardsConfig.branding;
      const isLogoDefaultValid = await this.isUrlValid(branding.logo.defaultUrl, 'logo default');
      const isLogoDarkmodeValid = darkMode ? await this.isUrlValid(branding.logo.darkModeUrl, 'logo darkMode') : false;
      const isMarkDefaultValid = await this.isUrlValid(branding.mark.defaultUrl, 'mark default');
      const isMarkDarkmodeValid = darkMode ? await this.isUrlValid(branding.mark.darkModeUrl, 'mark darkMode') : false;
      const isLoadingLogoDefaultValid = await this.isUrlValid(branding.loadingLogo.defaultUrl, 'loadingLogo default');
      const isLoadingLogoDarkmodeValid = darkMode ? await this.isUrlValid(branding.loadingLogo.darkModeUrl, 'loadingLogo darkMode') : false;
      const isFaviconValid = await this.isUrlValid(branding.faviconUrl, 'favicon');
      const isTitleValid = this.isTitleValid(branding.applicationTitle, 'applicationTitle');
      const brandingValidation = {
        isLogoDefaultValid,
        isLogoDarkmodeValid,
        isMarkDefaultValid,
        isMarkDarkmodeValid,
        isLoadingLogoDefaultValid,
        isLoadingLogoDarkmodeValid,
        isFaviconValid,
        isTitleValid
      };
      return brandingValidation;
    });

    _defineProperty(this, "isUrlValid", async (url, configName) => {
      if (url === '/') {
        return false;
      }

      if (url.match(/\.(png|svg|gif|PNG|SVG|GIF)$/) === null) {
        this.logger.get('branding').error(`${configName} config is invalid. Using default branding.`);
        return false;
      }

      return await _axios.default.get(url, {
        httpsAgent: this.httpsAgent,
        adapter: _http.default,
        maxRedirects: 0
      }).then(() => {
        return true;
      }).catch(() => {
        this.logger.get('branding').error(`${configName} URL was not found or invalid. Using default branding.`);
        return false;
      });
    });

    _defineProperty(this, "isTitleValid", (title, configName) => {
      if (!title) {
        return false;
      }

      if (title.length > 36) {
        this.logger.get('branding').error(`${configName} config is not found or invalid. Title length should be between 1 to 36 characters. Using default title.`);
        return false;
      }

      return true;
    });

    this.logger = this.coreContext.logger;
  }

  async setup({
    http,
    status,
    uiPlugins
  }) {
    const [opensearchDashboardsConfig, serverConfig] = await Promise.all([this.coreContext.configService.atPath('opensearchDashboards').pipe((0, _operators.first)()).toPromise(), this.coreContext.configService.atPath('server').pipe((0, _operators.first)()).toPromise()]);
    this.setupHttpAgent(serverConfig);
    return {
      render: async (request, uiSettings, {
        includeUserSettings = true,
        vars
      } = {}) => {
        var _settings$user, _settings$user$theme;

        const env = {
          mode: this.coreContext.env.mode,
          packageInfo: this.coreContext.env.packageInfo
        };
        const basePath = http.basePath.get(request);
        const uiPublicUrl = `${basePath}/ui`;
        const serverBasePath = http.basePath.serverBasePath;
        const settings = {
          defaults: uiSettings.getRegistered(),
          user: includeUserSettings ? await uiSettings.getUserProvided() : {}
        };
        const darkMode = (_settings$user = settings.user) !== null && _settings$user !== void 0 && (_settings$user$theme = _settings$user['theme:darkMode']) !== null && _settings$user$theme !== void 0 && _settings$user$theme.userValue ? Boolean(settings.user['theme:darkMode'].userValue) : false;
        const brandingAssignment = await this.assignBrandingConfig(darkMode, opensearchDashboardsConfig);
        const metadata = {
          strictCsp: http.csp.strict,
          uiPublicUrl,
          bootstrapScriptUrl: `${basePath}/bootstrap.js`,
          i18n: _i18n.i18n.translate,
          locale: _i18n.i18n.getLocale(),
          darkMode,
          injectedMetadata: {
            version: env.packageInfo.version,
            buildNumber: env.packageInfo.buildNum,
            branch: env.packageInfo.branch,
            basePath,
            serverBasePath,
            env,
            anonymousStatusPage: status.isStatusPageAnonymous(),
            i18n: {
              translationsUrl: `${basePath}/translations/${_i18n.i18n.getLocale()}.json`
            },
            csp: {
              warnLegacyBrowsers: http.csp.warnLegacyBrowsers
            },
            vars: vars !== null && vars !== void 0 ? vars : {},
            uiPlugins: await Promise.all([...uiPlugins.public].map(async ([id, plugin]) => ({
              id,
              plugin,
              config: await this.getUiConfig(uiPlugins, id)
            }))),
            legacyMetadata: {
              uiSettings: settings
            },
            branding: {
              darkMode,
              assetFolderUrl: `${uiPublicUrl}/default_branding`,
              logo: {
                defaultUrl: brandingAssignment.logoDefault,
                darkModeUrl: brandingAssignment.logoDarkmode
              },
              mark: {
                defaultUrl: brandingAssignment.markDefault,
                darkModeUrl: brandingAssignment.markDarkmode
              },
              loadingLogo: {
                defaultUrl: brandingAssignment.loadingLogoDefault,
                darkModeUrl: brandingAssignment.loadingLogoDarkmode
              },
              faviconUrl: brandingAssignment.favicon,
              applicationTitle: brandingAssignment.applicationTitle,
              useExpandedHeader: brandingAssignment.useExpandedHeader
            },
            survey: opensearchDashboardsConfig.survey.url
          }
        };
        return `<!DOCTYPE html>${(0, _server.renderToStaticMarkup)( /*#__PURE__*/_react.default.createElement(_views.Template, {
          metadata: metadata
        }))}`;
      }
    };
  }

  async stop() {}
  /**
   * Setups HTTP Agent if SSL is enabled to pass SSL config
   * values to Axios to make requests in while validating
   * resources.
   *
   * @param {Readonly<HttpConfigType>} httpConfig
   */


  setupHttpAgent(httpConfig) {
    var _httpConfig$ssl;

    if (!((_httpConfig$ssl = httpConfig.ssl) !== null && _httpConfig$ssl !== void 0 && _httpConfig$ssl.enabled)) return;

    try {
      const sslConfig = new _ssl_config.SslConfig(httpConfig.ssl);
      this.httpsAgent = new _https.Agent({
        ca: sslConfig.certificateAuthorities,
        cert: sslConfig.certificate,
        key: sslConfig.key,
        passphrase: sslConfig.keyPassphrase,
        rejectUnauthorized: false
      });
    } catch (e) {
      this.logger.get('branding').error('HTTP agent failed to setup for SSL.');
    }
  }
  /**
   * Assign values for branding related configurations based on branding validation
   * by calling checkBrandingValid(). For dark mode URLs, add additonal validation
   * to see if there is a valid default mode URL exist first. If URL is valid, pass in
   * the actual URL; if not, pass in undefined.
   *
   * @param {boolean} darkMode
   * @param {Readonly<OpenSearchDashboardsConfigType>} opensearchDashboardsConfig
   * @returns {BrandingAssignment} valid URLs or undefined assigned for each branding configs
   */


  async getUiConfig(uiPlugins, pluginId) {
    var _await$browserConfig$;

    const browserConfig = uiPlugins.browserConfigs.get(pluginId);
    return (_await$browserConfig$ = await (browserConfig === null || browserConfig === void 0 ? void 0 : browserConfig.pipe((0, _operators.take)(1)).toPromise())) !== null && _await$browserConfig$ !== void 0 ? _await$browserConfig$ : {};
  }
  /**
   * Validation function for URLs. Use Axios to call URL and check validity.
   * Also needs to be ended with png, svg, gif, PNG, SVG and GIF.
   *
   * @param {string} url
   * @param {string} configName
   * @returns {boolean} indicate if the URL is valid/invalid
   */


}

exports.RenderingService = RenderingService;