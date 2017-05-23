package algorithms;

import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartPanel;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.axis.NumberAxis;
import org.jfree.chart.plot.PlotOrientation;
import org.jfree.chart.plot.XYPlot;
import org.jfree.chart.renderer.xy.XYLineAndShapeRenderer;
import org.jfree.data.xy.XYDataset;
import org.jfree.data.xy.XYSeries;
import org.jfree.data.xy.XYSeriesCollection;
import org.jfree.ui.ApplicationFrame;

import javax.swing.*;
import java.awt.*;

/**
 * Created by me497 on 22.05.2017.
 */
public class CDAAlgorithm extends JFrame {

    public CDAAlgorithm(String title, int xa, int ya, int xb, int yb) {
        super(title);
        this.setDefaultCloseOperation(DISPOSE_ON_CLOSE);
        XYSeriesCollection dataset = new XYSeriesCollection();
        dataset.addSeries(getCoords(xa, ya, xb, yb));
        JFreeChart xylineChart = createChart(dataset);

        ChartPanel chartPanel = new ChartPanel(xylineChart);
        chartPanel.setPreferredSize(new java.awt.Dimension(500, 500));
        setContentPane(chartPanel);
    }

    public XYSeries getCoords(float x0, float y0, float x1, float y1) {
        XYSeries xySeries = new XYSeries("First");

        int i, L, xStart, yStart, xEnd, yEnd;

        float dX, dY;

        xStart = Math.round(x0);
        yStart = Math.round(y0);
        xEnd = Math.round(x1);
        yEnd = Math.round(y1);

        L = Math.max(Math.abs(xEnd - xStart), Math.abs(yEnd - yStart));

        dX = (x1 - x0) / L;
        dY = (y1 - y0) / L;

        xySeries.add(x0, y0);
        i = 1;
        float xPrev = x0;
        float yPrev = y0;
        while (i < L) {

            xySeries.add(Math.round(xPrev + dX), Math.round(yPrev + dY));
            xPrev += dX;
            yPrev += dY;
            i++;
        }
        xySeries.add(x1, y1);

        return xySeries;
    }

    private JFreeChart createChart(final XYDataset dataset) {

        // create the chart...
        final JFreeChart chart = ChartFactory.createXYLineChart(
                "CDA algorithm",      // chart title
                "X",                      // x axis label
                "Y",                      // y axis label
                dataset,                  // data
                PlotOrientation.VERTICAL,
                true,                     // include legend
                true,                     // tooltips
                false                     // urls
        );


        // NOW DO SOME OPTIONAL CUSTOMISATION OF THE CHART...
        chart.setBackgroundPaint(Color.white);


//        final StandardLegend legend = (StandardLegend) chart.getLegend();
        //      legend.setDisplaySeriesShapes(true);

        // get a reference to the plot for further customisation...
        final XYPlot plot = chart.getXYPlot();
        plot.setBackgroundPaint(Color.lightGray);
        //    plot.setAxisOffset(new Spacer(Spacer.ABSOLUTE, 5.0, 5.0, 5.0, 5.0));
        plot.setDomainGridlinePaint(Color.white);
        plot.setRangeGridlinePaint(Color.white);

        plot.setRenderer(new ScalableDotRenderer(false));


        // change the auto tick unit selection to integer units only...
        final NumberAxis rangeAxis = (NumberAxis) plot.getRangeAxis();

        rangeAxis.setStandardTickUnits(NumberAxis.createIntegerTickUnits());
        // OPTIONAL CUSTOMISATION COMPLETED.


        return chart;

    }
}
