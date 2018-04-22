# Grafana Parity Report

A parity report panel for [Grafana](http://grafana.org/).

![Parity Report Panel](https://raw.githubusercontent.com/zuburqan/grafana-parity-report/master/src/img/parity_report.png)

## Overview

This panel shows a parity report for multiple series. A report is represented as a table with rows. Each row shows a custom check expressed as an equation having the series data reduced to a representative value by means of [mathjs](http://mathjs.org/docs/reference/functions.html) functions along with two extra functions supported by this plugin, namely:

    # gives the first datapoint in the series
    first()

    # gives the last datapoint in the series
    last()

Each of these functions takes an alias name genereated by the 'alias()' graphite function for queries under the metrics tab. An example of queries having aliases as A, B and C is shown below:

![Parity Report Metrics Tab](https://raw.githubusercontent.com/zuburqan/grafana-parity-report/master/src/img/parity_report_metrics.png)

    alias(test.network.toplevel.traffic.incoming.rate, 'A')

    alias(test.network.toplevel.traffic.outgoing.route1.rate, 'B')

    alias(test.network.toplevel.traffic.outgoing.route2.rate, 'C')

These queries can then be used in the custom checks expressed as equations and referred by their aliases A, B and C.

![Parity Report Options Tab](https://raw.githubusercontent.com/zuburqan/grafana-parity-report/master/src/img/parity_report_options.png)

    max(A) + min(B) = mean(C) * 2

    sum(B) / first(A) * 5 = last(C)

    first(A) + var(B) = first(B) + std(C)

    derivative("x^2", "x").eval({x: mean(A)}) = hypot(C)

On defining equations like above one can set multiple thresholds on accepted percentage difference between LHS and RHS of the equation, the breach of which can be shown in the parity report table as different colors set against the thresholds. The report also shows the percentage difference with configurable precision.

## Compatibility

This panel should work will work with [Graphite](https://grafana.net/plugins/graphite).

## Development

[Docker](https://www.docker.com/) is an easy way to spin-up an instance of Grafana. With docker installed, run the following command in the directory containing the plugin; this will expose the local plugin on your machine to the Grafana container so you can test it out.

    docker run -it -v $PWD:/var/lib/grafana/plugins/parity_report -p 3000:3000 --name grafana.docker grafana/grafana

Now do this...

    # Install development packages
    npm install

    # Install the grunt-cli
    sudo npm install -g grunt-cli

    # Compile into dist/
    grunt

    # Restart Grafana to see it
    docker restart grafana.docker

    # Watch for changes (requires refresh)
    grunt watch

Use `grunt test` to run the Jasmine tests for the plugin; and `grunt eslint` to check for style issues. Note that the plugin controller isn't tested because it depends on Grafana native libraries, which aren't available outside of Grafana.

## Contributing

For bugs and new features, open an issue and we'll take a look. If you want to contribute to the plugin, you're welcome to submit a pull request - just make sure `grunt` runs without errors first.
