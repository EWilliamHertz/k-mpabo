import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    '3000-cs-553118797525-default.cs-europe-west4-pear.cloudshell.dev',
    'kampabo-dev.loca.lt'
  ],
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000', 
        '3000-cs-553118797525-default.cs-europe-west4-pear.cloudshell.dev',
        'kampabo-dev.loca.lt'
      ]
    }
  }
};

export default withNextIntl(nextConfig);
