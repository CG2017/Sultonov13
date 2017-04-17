package Converter;

/**
 * Created by me497 on 03.04.2017.
 */
public class ColorCIELab {
    public final double L;
    public final double a;
    public final double b;

    public ColorCIELab(double l, double a, double b) {
        this.L = l;
        this.a = a;
        this.b = b;
    }

    public final String toString() {
        return "{L: " + this.L + ", a: " + this.a + ", b: " + this.b + "}";
    }
}
