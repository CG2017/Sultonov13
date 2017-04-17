package Converter;

/**
 * Created by me497 on 03.04.2017.
 */
public class ColorCIELuv {
    public final double L;
    public final double u;
    public final double v;

    public ColorCIELuv(double l, double u, double v) {
        this.L = l;
        this.u = u;
        this.v = v;
    }

    public String toString() {
        return "{L: " + this.L + ", u: " + this.u + ", v: " + this.v + "}";
    }
}
