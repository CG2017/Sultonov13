package algorithms;

import org.jfree.chart.axis.ValueAxis;
import org.jfree.chart.plot.CrosshairState;
import org.jfree.chart.plot.PlotRenderingInfo;
import org.jfree.chart.plot.XYPlot;
import org.jfree.chart.renderer.xy.XYItemRendererState;
import org.jfree.chart.renderer.xy.XYLineAndShapeRenderer;
import org.jfree.data.xy.XYDataset;
import org.jfree.ui.RectangleEdge;

import java.awt.*;
import java.awt.geom.Ellipse2D;
import java.awt.geom.Rectangle2D;

/**
 * Created by me497 on 22.05.2017.
 */
class ScalableDotRenderer extends XYLineAndShapeRenderer {
    /**
     * Default factor by which to multiply bar width to obtain dot size
     */
    protected static final double DEFAULT_WIDTH_FACTOR = 0.5;
    /**
     * Factor by which to multiply bar width to obtain dot size
     */
    protected double barwidthfactor = DEFAULT_WIDTH_FACTOR;
    private boolean isCircle = false;

    private double xPrev = 0;
    private double yPrev = 0;


    /**
     * The dot to use for the current pass
     */
    protected Shape thedot = null;

    /**
     * Constructor that sets the dot size as a proportion of the bar width
     *
     * @param factor the factor by which to multiply bar width to obtain dot size
     */
    public ScalableDotRenderer(double factor, boolean isCircle) {
        //this(isCircle);
        this.barwidthfactor = factor;

    }



    /**
     * Default constructor, leave bar width factor set to default;
     */
    public ScalableDotRenderer(boolean isCircle) {
        super();
        setBaseLinesVisible(false);
        setBaseShapesVisible(true);
        this.isCircle = isCircle;
    }

    /**
     * Override XYLineAndShapeRenderer.initialize() to ensure that thedot is recreated on next drawItem().
     */
    @Override
    public XYItemRendererState initialise(Graphics2D g2,
                                          Rectangle2D dataArea,
                                          XYPlot plot,
                                          XYDataset data,
                                          PlotRenderingInfo info) {
        thedot = null;
        return super.initialise(g2, dataArea, plot, data, info);
    }

    /**
     * Override the XYLineAndShapeRenderer.drawItem() to create and cache the scaled dot.
     */
    @Override
    public void drawItem(Graphics2D g2, XYItemRendererState state,
                         Rectangle2D dataArea, PlotRenderingInfo info, XYPlot plot,
                         ValueAxis domainAxis, ValueAxis rangeAxis, XYDataset dataset,
                         int series, int item, CrosshairState crosshairState, int pass) {

        if (thedot == null) {
        double yDist = 1;
        double xDist = 1;
//        if (isCircle) {
//            yDist = 1;
//            xDist = 1;
//        }
//         else {
//            if (item == 0) {
//                yDist = Math.abs(dataset.getYValue(series, item) - dataset.getYValue(series, item + 1));
//                xDist = Math.abs(dataset.getXValue(series, item) - dataset.getXValue(series, item + 1));
//            } else {
//                yDist = Math.abs(dataset.getYValue(series, item) - dataset.getYValue(series, item - 1));
//                xDist = Math.abs(dataset.getXValue(series, item) - dataset.getXValue(series, item - 1));
//            }
//
//            if (xDist == 0) {
//                xDist = xPrev;
//            }
//            if (yDist == 0) {
//                yDist = yPrev;
//            }
//
//            yPrev = yDist;
//            xPrev = xDist;
//        }


        double width = 0.0;
        double height = 0.0;
        RectangleEdge domainEdge = plot.getDomainAxisEdge();
        RectangleEdge rangeEdge = plot.getRangeAxisEdge();
        double widthms = xDist * 2 - (xDist * 2) * 0.01;
        double heightms = yDist * 2 - (yDist * 2) * 0.01;
        double left = dataset.getXValue(series, item) - widthms;
        double up = dataset.getYValue(series, item) - heightms;

        for (int j = 0; j < 2; j++) { // check at least two bars to ensure an accurate width
            double right = left + widthms;
            double lpos = domainAxis.valueToJava2D(left, dataArea, domainEdge);
            double rpos = domainAxis.valueToJava2D(right, dataArea, domainEdge);
            width = Math.max(width, Math.abs(rpos - lpos));
            left += widthms;

            double down = up + heightms;
            double upos = rangeAxis.valueToJava2D(up, dataArea, rangeEdge);
            double dpos = rangeAxis.valueToJava2D(down, dataArea, rangeEdge);
            height = Math.max(height, Math.abs(upos - dpos));
            up += heightms;
        }
        width *= barwidthfactor;
        height *= barwidthfactor;
        thedot = new Rectangle2D.Double(-width * 0.5, -height * 0.5, width, height);

        }

        double maxX = plot.getDataRange(plot.getDomainAxis()).getUpperBound() + 10;
        double minX = plot.getDataRange(plot.getDomainAxis()).getLowerBound() - 10;

        double maxY = plot.getDataRange(plot.getRangeAxis()).getUpperBound() + 10;
        double minY = plot.getDataRange(plot.getRangeAxis()).getLowerBound() - 10;

        plot.getDomainAxis().setUpperBound(maxX);
        plot.getDomainAxis().setLowerBound(minX);
//        plot.getRangeAxis().setUpperBound(maxY);
//        plot.getRangeAxis().setLowerBound(minY);
//        plot.getDomainAxis().setLowerBound(plot.getDomainAxis().getLowerBound() - 10);
//        plot.getRangeAxis().setUpperBound(plot.getRangeAxis().getUpperBound() + 10);
//        plot.getRangeAxis().setLowerBound(plot.getRangeAxis().getLowerBound() - 10);
        super.drawItem(g2, state, dataArea, info, plot, domainAxis, rangeAxis, dataset, series, item, crosshairState, pass);
    }

    /**
     * Override XYLineAndShapeRenderer.getItemShape() to return the properly scaled dot.
     */
    @Override
    public Shape getItemShape(int series, int item) {
        return thedot;
    }
}