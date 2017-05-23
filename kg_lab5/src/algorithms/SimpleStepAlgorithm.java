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
public class SimpleStepAlgorithm extends JFrame {
    XYSeries series;

    public SimpleStepAlgorithm(String title, int x0, int y0, int x1, int y1) {
        super(title);
        this.setDefaultCloseOperation(DISPOSE_ON_CLOSE);

        XYSeriesCollection dataset = new XYSeriesCollection();
        getCoords(x0, y0, x1, y1);
        dataset.addSeries(series);
        final JFreeChart chart = createChart(dataset);
        ChartPanel chartPanel = new ChartPanel(chart);
        chartPanel.setPreferredSize(new java.awt.Dimension(500, 500));
        setContentPane(chartPanel);
    }

    public void getCoords(int xstart, int ystart, int xend, int yend) {
        series = new XYSeries("First");

        if (xstart > xend) {
            getCoords(xend, yend, xstart, ystart);
            return ;
        }

        float y = ystart;
        float m = (float) (yend - ystart) / (xend - xstart);

        //  if m < 45 degrees to axis x then main axis is axis x
        if (Math.abs(m) <= 1) {
            for (int xi = xstart; xi <= xend; ++xi) {
                series.add(xi, (int) Math.round(y));
                y += m;
            }
        }
        else {
            rastersteepline(ystart, xstart, yend, xend);
        }

    }

    private void rastersteepline(int xstart, int ystart, int xend, int yend) {

        if (xstart > xend) {
            rastersteepline(xend, yend, xstart, ystart);
            return;
        }

        float y = ystart;
        float m = (float) (yend - ystart) / (xend - xstart);

        for (int xi = xstart; xi <= xend; ++xi) {
            series.add((int) Math.round(y), xi);
            y += m;
        }
    }

    private JFreeChart createChart(final XYDataset dataset) {

        // create the chart...
        final JFreeChart chart = ChartFactory.createXYLineChart(
                "Simple algorithm",      // chart title
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
