package Converter;

/**
 * Created by me497 on 03.04.2017.
 */
public class ColorXYZ {
    public final double X;
    public final double Y;
    public final double Z;

    public ColorXYZ(double x, double y, double z) {
        this.X = x;
        this.Y = y;
        this.Z = z;
    }

    public final String toString() {
        return "{X: " + this.X + ", Y: " + this.Y + ", Z: " + this.Z + "}";
    }
}
