package algorithms;

import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartPanel;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.axis.NumberAxis;
import org.jfree.chart.plot.PlotOrientation;
import org.jfree.chart.plot.XYPlot;
import org.jfree.data.xy.XYDataset;
import org.jfree.data.xy.XYSeries;
import org.jfree.data.xy.XYSeriesCollection;
import org.jfree.ui.ApplicationFrame;

import javax.swing.*;
import java.awt.*;

/**
 * Created by me497 on 22.05.2017.
 */
public class BresenhamCircleAlgorithm extends JFrame {

    public BresenhamCircleAlgorithm(String title, int x0, int y1, int R) {
        super(title);
        this.setDefaultCloseOperation(DISPOSE_ON_CLOSE);

        XYSeriesCollection dataset = new XYSeriesCollection();
        dataset.addSeries(getCoords(x0, y1, R));
        JFreeChart chart = createChart(dataset);
        final ChartPanel chartPanel = new ChartPanel(chart);

        chartPanel.setPreferredSize(new java.awt.Dimension(500, 500));
        setContentPane(chartPanel);
    }




    public XYSeries getCoords(int x1, int y1, int R) {
        XYSeries xySeries = new XYSeries("First");

        int x = R;
        int y = 0;

        int delta = 1 - x;

        while (y <= x) {
            xySeries.add(x + x1, y + y1);
            xySeries.add(y + x1, x + y1);
            xySeries.add(-x + x1, y + y1);
            xySeries.add(-y + x1, x + y1);
            xySeries.add(-x + x1, -y + y1);
            xySeries.add(-y + x1, -x + y1);
            xySeries.add(x + x1, -y + y1);
            xySeries.add(y + x1, -x + y1);
            y++;
            if (delta <= 0) {
                delta += 2 * y + 1;
            } else {
                x--;
                delta += 2 * (y - x) + 1;
            }


        }

        return xySeries;
    }

    private JFreeChart createChart(final XYDataset dataset) {

        // create the chart...
        final JFreeChart chart = ChartFactory.createXYLineChart(
                "Bresenham circle algorithm",      // chart title
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

        plot.setRenderer(new ScalableDotRenderer(true));


        // change the auto tick unit selection to integer units only...
        final NumberAxis rangeAxis = (NumberAxis) plot.getRangeAxis();

        rangeAxis.setStandardTickUnits(NumberAxis.createIntegerTickUnits());
        // OPTIONAL CUSTOMISATION COMPLETED.


        return chart;

    }
}
