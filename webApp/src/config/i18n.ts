import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend"
import i18n from 'i18next'
import {config} from './app.config';

function configureI18n() {
    i18n.use(Backend)
        .use(initReactI18next)
        .init({
            lng: 'de',
            backend: {
                /* translation file path */
                loadPath: config.i18nUrl,
                crossDomain: true
            },
            fallbackLng: 'de',
            debug: config.production,
            ns: ['common', 'notification', 'error'],
            defaultNS: 'common',
            interpolation: {
                escapeValue: false,
                formatSeparator: ','
            },
            react: {
                wait: true
            }
        });
}

export default configureI18n;