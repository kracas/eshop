module.exports = {
    apps: [
      {
        name: 'storefront',
        script: 'node_modules/next/dist/bin/next',
        args: 'start -p 8000',
        cwd: `${process.env.PWD}/current`,
        error_file: `${process.env.PWD}/logs/app.err.log`,
        out_file: `${process.env.PWD}/logs/app.out.log`,
        instances: 'max',
        exec_mode: 'cluster',
        listen_timeout: 10000,
        restart_delay: 10000
      }
    ]
  }
  