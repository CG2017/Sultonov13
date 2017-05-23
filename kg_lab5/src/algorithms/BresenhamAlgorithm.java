package algorithms;

import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartPanel;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.axis.AxisLocation;
import org.jfree.chart.axis.NumberAxis;
import org.jfree.chart.axis.ValueAxis;
import org.jfree.chart.event.ChartChangeEvent;
import org.jfree.chart.event.ChartChangeListener;
import org.jfree.chart.event.ChartProgressEvent;
import org.jfree.chart.event.ChartProgressListener;
import org.jfree.chart.plot.PlotOrientation;
import org.jfree.chart.plot.XYPlot;
import org.jfree.chart.renderer.xy.XYLineAndShapeRenderer;
import org.jfree.data.xy.XYDataItem;
import org.jfree.data.xy.XYDataset;
import org.jfree.data.xy.XYSeries;
import org.jfree.data.xy.XYSeriesCollection;
import org.jfree.ui.ApplicationFrame;

import javax.swing.*;
import java.awt.*;

/**
 * Created by me497 on 22.05.2017.
 */
public class BresenhamAlgorithm extends JFrame {
    XYSeries series;
    int minX;
    int maxX;
    int minY;
    int maxY;

    public BresenhamAlgorithm(String title, int x0, int y0, int x1, int y1) {
        super(title);
        this.setDefaultCloseOperation(DISPOSE_ON_CLOSE);

        XYSeriesCollection dataset = new XYSeriesCollection();
        series = getCoords(x0, y0, x1, y1);
        dataset.addSeries(series);
        final JFreeChart chart = createChart(dataset);

        ChartPanel chartPanel = new ChartPanel(chart);
        chartPanel.setPreferredSize(new java.awt.Dimension(500, 500));
        setContentPane(chartPanel);
    }

    public XYSeries getCoords(int x0, int y0, int x1, int y1) {
        XYSeries xySeries = new XYSeries("First");

        int deltaX = Math.abs(x1 - x0);
        int deltaY = Math.abs(y1 - y0);
        int s1 = (int) Math.signum(x1 - x0);
        int s2 = (int) Math.signum(y1 - y0);
        int y = y0;
        int x = x0;
        boolean changeFlag;

        if (deltaY > deltaX) {
            int temp = deltaX;
            deltaX = deltaY;
            deltaY = temp;
            changeFlag = true;
        } else {
            changeFlag = false;
        }

        int t = 2 * deltaY - deltaX;

        for (int i = 0; i <= deltaX; i++) {
            xySeries.add(x, y);
            while (t >= 0) {
                if (changeFlag)
                    x += s1;
                else
                    y += s2;
                t -= 2 * deltaX;
            }
            if (changeFlag) {
                y += s2;
            } else {
                x += s1;
            }
            t += 2 * deltaY;
        }

        return xySeries;
    }

    private JFreeChart createChart(final XYDataset dataset) {

        // create the chart...
        final JFreeChart chart = ChartFactory.createXYLineChart(
                "Bresenham algorithm",      // chart title
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


        minX = ((XYDataItem) series.getItems().get(0)).getX().intValue();
        minY = ((XYDataItem) series.getItems().get(0)).getY().intValue();
        maxX = ((XYDataItem) series.getItems().get(0)).getX().intValue();
        maxY = ((XYDataItem) series.getItems().get(0)).getY().intValue();
        for (Object item : series.getItems()) {
            if (((XYDataItem) item).getX().intValue() >= maxX) {
                maxX = ((XYDataItem) item).getX().intValue();
            }
            if (((XYDataItem) item).getX().intValue() <= minX) {
                minX = ((XYDataItem) item).getX().intValue();
            }
            if (((XYDataItem) item).getY().intValue() >= maxY) {
                maxY = ((XYDataItem) item).getY().intValue();
            }
            if (((XYDataItem) item).getY().intValue() <= minY) {
                minY = ((XYDataItem) item).getY().intValue();
            }
        }
//        plot.getDomainAxis().setUpperBound(maxX + 5);
//        plot.getDomainAxis().setLowerBound(minX - 5);
//        plot.getRangeAxis().setUpperBound(maxY + 5);
//        plot.getRangeAxis().setLowerBound(minY - 5);
        plot.setRenderer(new ScalableDotRenderer(false));


        // change the auto tick unit selection to integer units only...
        final NumberAxis rangeAxis = (NumberAxis) plot.getRangeAxis();

        rangeAxis.setStandardTickUnits(NumberAxis.createIntegerTickUnits());
        // OPTIONAL CUSTOMISATION COMPLETED.


        return chart;

    }


}

